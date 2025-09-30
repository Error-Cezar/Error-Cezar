import { Cron } from "croner";
import { Hono } from 'hono'
import { serveStatic, upgradeWebSocket, websocket } from 'hono/bun'
import type { WSContext } from 'hono/ws';
// -------
import { LastFMUser } from 'lastfm-ts-api';
// -------
import { Top } from './pages/main';

const FM_API = process.env.FM_API || ""
const FM_USER = process.env.FM_USER || ""
const ENV = process.env.NODE_ENV || "development"
const user = new LastFMUser(FM_API);

let clients = [] as WSContext<any>[]

function debugLog(...args: any[]) {
  if(ENV == "development") {
    console.log(`[${new Date().toISOString()}]`, ...args)
  }
}

type FMData = { 
  artist: string,
  track: string,
  album: string,
  image: string,
  url: string,
  playing: boolean
}

let FM_LastFetch: {} | FMData = {}

function WS_Fire(ws: WSContext<any>) {
    ws.send(JSON.stringify(FM_LastFetch))
}

function broadcast() {
  clients.forEach((client) => {
    WS_Fire(client)
  })
}

// use fm api here
const FM_JOB = new Cron('*/3 * * * * *', () => {
  // check clients are connected
  if(clients.length === 0) return;

  debugLog("Fetching last.fm data...")
  user.getRecentTracks({ user: FM_USER, limit: 1 }).then((value) => {
    let last = value.recenttracks.track[0]
    if(!last?.["@attr"] || !last?.["@attr"]?.nowplaying) {
      debugLog("User is not currently playing anything on Last.fm")
      if (!("track" in FM_LastFetch) || (FM_LastFetch.track !== last?.name)) {
        debugLog("User stopped playing music, broadcasting last played track")
        FM_LastFetch = {
          artist: last?.artist["#text"],
          track: last?.name,
          album: last?.album["#text"],
          image: last?.image?.[3]?.["#text"] ?? "",
          url: last?.url,
          playing: false
        }
        broadcast()
      }
      return
    }

    debugLog("User is currently playing something on Last.fm")

    if(FM_LastFetch.hasOwnProperty("track") && (FM_LastFetch as FMData).track === last.name) {
      debugLog("Same track as before, not broadcasting")
      return
    }

    FM_LastFetch = {
      artist: last.artist["#text"],
      track: last.name,
      album: last.album["#text"],
      image: last.image?.[3]?.["#text"] ?? "",
      url: last.url,
      playing: true
    }
    broadcast()
  }).catch(console.error);
});

const app = new Hono()
app.use('*', serveStatic({
	root: './public'
}));

app.get('/', (c) => {
	return c.html(<Top />)
})

const ws = app.get(
  '/fm',
  upgradeWebSocket((_c) => {
    return {
      onOpen(_event, ws) {
        WS_Fire(ws)
        clients.push(ws)
      },
      onClose(_event, ws) {
        clients = clients.filter((client) => client !== ws)
      },
    }
  })
)

export default {
	port: 3000,
	fetch: app.fetch,
	websocket
}