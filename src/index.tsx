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
const user = new LastFMUser(FM_API);

let clients = [] as WSContext<any>[]

type FMData = { 
  artist: string,
  track: string,
  album: string,
  image: string,
  url: string
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

  user.getRecentTracks({ user: FM_USER, limit: 2 }).then((value) => {
    let last = value.recenttracks.track[0]
    //console.log(last)
    if(!last?.["@attr"] || !last?.["@attr"]?.nowplaying) {
      if (FM_LastFetch.hasOwnProperty("artist")) {
        FM_LastFetch = {}
        broadcast()
      }
      return
    }

    if(FM_LastFetch.hasOwnProperty("track") && (FM_LastFetch as FMData).track === last.name) {
      return
    }

    FM_LastFetch = {
      artist: last.artist["#text"],
      track: last.name,
      album: last.album["#text"],
      image: last.image?.[3]?.["#text"] ?? "",
      url: last.url
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
      onClose(evt, ws) {
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