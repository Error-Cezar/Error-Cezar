import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { pg } from "..";

export const admin_app = new Hono();

admin_app.use(
  '/key',
  bearerAuth({
    verifyToken: async (token, c) => {
      return token === process.env.ADMIN_KEY;
    },
  })
)
admin_app.post('/key', async (c) => {
    // add a new key to the database
    try {
        const key = Bun.randomUUIDv7();
        await pg`INSERT INTO apikeys (key) VALUES (${key})`;
        return c.json({key: key});
    }
    catch (e) {
        c.status(500);
        return c.json({error: "Internal server error"});
    }  
})