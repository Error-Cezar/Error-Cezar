import { Hono } from "hono";
import { IndiviousApp } from "../pages/indivious";

const API = "https://youtube.com/oembed"
const embedAPI = "https://yewtu.be/embed"
const viewAPI = "https://yewtu.be"

export const indivious_app = new Hono();

indivious_app.get("/:id", async (c) => {
  const ID = c.req.param("id");

  try {
    const res = await fetch(`${API}?url=https://www.youtube.com/watch?v=${ID}&format=js`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    // console.log(data);
    return c.html(<IndiviousApp data={{
      title: data.title,
      author_name: data.author_name,
      thumbnail_url: data.thumbnail_url,
      url: `${viewAPI}/watch?v=${ID}`,
      video: `${embedAPI}/${ID}?autoplay=1&player_style=youtube&local=true`
    }} />)
  } catch (error) {
    console.info('Error fetching oembed data:', error);
    return c.json({ error: 'Failed to fetch video data' }, 404);
  }
});
