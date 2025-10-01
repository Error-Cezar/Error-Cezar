import { Hono } from "hono";
import { Top } from "../pages/main";

export const site_app = new Hono();

site_app.get('/', (c) => {
    return c.html(<Top />)
})