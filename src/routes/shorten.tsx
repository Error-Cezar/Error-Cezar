import { Hono } from "hono";
import { debugLog, pg } from "..";
import { validateRequest } from "../validators/shorten";
import { validator } from "hono/validator";
import { bearerAuth } from "hono/bearer-auth";

import { Shorten } from "../pages/shorten";

import { MiddlewareHandler } from "../modules/database";

export const short_app = new Hono();

short_app.get('/', (c) => {
    return c.html(<Shorten />)
})

short_app.use('/', bearerAuth({
    verifyToken: MiddlewareHandler
  })
)
short_app.post('/', validator("json", validateRequest), async (c) => {
    const data = c.req.valid("json");
    if (typeof data === "string") {
        return c.json({error: data});
    }

    try {
        await pg`INSERT INTO shorten (ID, link, timestamp) VALUES (${data.shorten}, ${data.link}, CURRENT_TIMESTAMP)`;
        return c.json({shorten: data.shorten, link: data.link});
    }
    catch (e) {
        c.status(500);
        return c.json({error: "Internal server error"});
    }
})

short_app.get("/:id", async (c) => {
    const shorten = c.req.param('id'); // Get the dynamic parameter 'id'
    debugLog("checking for shorten:", shorten);
    try {
        const result = await pg`SELECT link FROM shorten WHERE ID = ${shorten}`
        if (result.length === 0) {
            debugLog("Shorten not found:", shorten);
            c.status(404);
            return c.json({error: "Not found"});
        }
        debugLog("Found shorten:", shorten, "->", result[0].link);
        return c.redirect(result[0].link);
    } catch (e) {
        c.status(500);
        console.error("Error searching for short link:", e);
        return c.json({error: "Internal server error"});
    }
})
