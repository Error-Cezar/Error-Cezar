import { Hono } from "hono";
import { upgradeWebSocket } from "hono/bun";
import {addClient, debugLog, removeClient, WS_Fire } from "..";

export const ws_app = new Hono();

ws_app.get(
  '/fm',
  upgradeWebSocket((_c) => {
    return {
      onOpen(_event, ws) {
        debugLog("Client connected")
        WS_Fire(ws)
        addClient(ws)
      },
      onClose(_event, ws) {
        debugLog("Client disconnected")
        removeClient(ws)
      },
    }
  })
)