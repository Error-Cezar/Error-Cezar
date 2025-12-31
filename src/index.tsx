import { Cron } from "croner";
import { Hono } from "hono";
import { serveStatic, websocket } from "hono/bun";
import type { WSContext } from "hono/ws";

import { SQL } from "bun";

// -------
import Settings from "./settings.json";
import { LastFMUser } from "lastfm-ts-api";
// -------

const FM_API = process.env.FM_API || "";
const FM_USER = process.env.FM_USER || "";
const ENV = process.env.NODE_ENV || "development";
const user = new LastFMUser(FM_API);

let clients = new Map<string, WSContext<any>>(); // Use Map for socket references

export function debugLog(...args: any[]) {
  if (ENV == "development") {
    console.log(`[${new Date().toISOString()} - DEV]`, ...args);
  }
}

export function Log(...args: any[]) {
  console.log(`[${new Date().toISOString()}]`, ...args);
}

const dbhost = process.env.DB_HOST;
const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;
const dbname = process.env.DB_NAME;

export const pg = new SQL(
  `postgres://${dbuser}:${dbpassword}@${dbhost}/${dbname}`,
);

process.once("exit", async (code) => {
  Log(`Closing database connection due to process exit with code: ${code}`);
  await pg.close();
});

process.once("SIGINT", () => {
  Log("Received SIGINT. Exiting...");
  process.exit(0); // Optionally exit with a status code
});

type FMData = {
  artist: string;
  track: string;
  album: string;
  image: string;
  url: string;
  playing: boolean;
};

let FM_LastFetch: {} | FMData = {};

export function WS_Fire(ws: WSContext<any>) {
  ws.send(JSON.stringify(FM_LastFetch));
}

function broadcast() {
  debugLog("Broadcasting Last.fm update to connected clients...");
  for (const client of getClients()) {
    WS_Fire(client);
  }
}

export function getClients() {
  return Array.from(clients.values());
}

export function addClient(ws: WSContext<any>) {
  clients.set(ws.raw, ws); // ws.raw is the underlying socket, stable across events
}

export function removeClient(ws: WSContext<any>) {
  if (clients.has(ws.raw)) {
    clients.delete(ws.raw);
  } else {
    console.warn("Client not found in list, cannot remove");
  }
}
// use fm api here
const FM_JOB = new Cron("*/3 * * * * *", () => {
  // check clients are connected
  if (Object.keys(getClients()).length === 0) return;

  // debugLog("Fetching last.fm data...")
  user
    .getRecentTracks({ user: FM_USER, limit: 1 })
    .then((value) => {
      let last = value.recenttracks.track[0];
      if (!last?.["@attr"] || !last?.["@attr"]?.nowplaying) {
        // debugLog("User is not currently playing anything on Last.fm")
        if (!("track" in FM_LastFetch) || FM_LastFetch.track !== last?.name) {
          debugLog(
            "User stopped playing music, broadcasting last played track",
          );
          FM_LastFetch = {
            artist: last?.artist["#text"],
            track: last?.name,
            album: last?.album["#text"],
            image: last?.image?.[3]?.["#text"] ?? "",
            url: last?.url,
            playing: false,
          };
          broadcast();
        }
        return;
      }

      // debugLog("User is currently playing something on Last.fm")

      if (
        FM_LastFetch.hasOwnProperty("track") &&
        (FM_LastFetch as FMData).track === last.name
      ) {
        // debugLog("Same track as before, not broadcasting")
        return;
      }

      FM_LastFetch = {
        artist: last.artist["#text"],
        track: last.name,
        album: last.album["#text"],
        image: last.image?.[3]?.["#text"] ?? "",
        url: last.url,
        playing: true,
      };

      debugLog("New track detected, broadcasting update");
      broadcast();
    })
    .catch((err) => {
      console.info("Error fetching Last.fm data:", err);
    });
});

if (ENV == "development" && Settings.NoFMOnDev) {
  FM_JOB.stop();
  debugLog("Last.fm cron job stopped, dev mode");
}

import { short_app } from "./routes/shorten";
import { site_app } from "./routes/site";
import { ws_app } from "./routes/ws";
import { admin_app } from "./routes/admin";

import { ensureShorten } from "./modules/database";
import { articles_app } from "./routes/articles";
import { misc_app } from "./routes/misc";
ensureShorten(pg);

const app = new Hono().use("*", serveStatic({ root: "./public" }));

app.onError((err, c) => {
  console.error(`Error occurred during request to ${c.req.url}:`, err);
  return c.text("Internal Server Error", 500);
});

app.route("/", site_app);
app.route("/", ws_app);
app.route("/", misc_app);

app.route("/short", short_app);
app.route("/blog", articles_app);

app.route("/admin", admin_app);

export default {
  port: 3000,
  fetch: app.fetch,
  websocket,
};
