import { Hono } from "hono";
import { serveStatic } from "hono/bun";

export const misc_app = new Hono();

misc_app.get("/maxie", async (c) => {
  return c.text(
    "https://iamawesome.com/ is a silly site\nand apparently maxie is a pretty cat",
  );
});

misc_app.use(
  "/roblox",
  serveStatic({
    path: "./public/videos/servers.mp4",
  }),
);

misc_app.use(
  "/a10",
  serveStatic({
    path: "./public/videos/a10.mp4",
  }),
);

misc_app.use(
  "/moon",
  serveStatic({
    path: "./public/videos/moon.mp4",
  }),
);
