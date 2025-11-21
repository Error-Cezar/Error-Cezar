import { Hono } from "hono";
import LZString from "../../public/js/modules/lz-string";

import { ArticleNew } from "../pages/article_new";
import { ArticleShow } from "../pages/article_show";
import { validateRequest } from "../validators/articles";
import { validator } from "hono/validator";
import { pg } from "..";
import { getArticle } from "../modules/database";

export const articles_app = new Hono();

articles_app.get("/", (c) => {
  return c.json({ meow: true });
});

articles_app.get("/get/:id", async (c) => {
  const articleID = c.req.param("id"); // Get the dynamic parameter 'id'

  const article = await getArticle(articleID);
  if (!article) {
    c.status(404);
    return c.json({ message: `No such article as ${articleID}`, status: 404 });
  }

  c.status(200);
  return c.json(article);
});

articles_app.get("/new", (c) => {
  return c.html(<ArticleNew />);
});

articles_app.post("/new", validator("json", validateRequest), async (c) => {
  const data = c.req.valid("json");
  if (typeof data === "string") {
    return c.json({ error: data });
  }

  try {
    await pg`
        INSERT INTO articles (ID, article_name, article_content, article_description, date_published, author) VALUES (10, ${data.Title}, ${data.Content}, ${data.Description}, CURRENT_TIMESTAMP, ${data.Author})`;
    return c.json({ success: true });
  } catch (e) {
    c.status(500);
    console.error(e);
    return c.json({ error: "Internal server error" });
  }
});

articles_app.get("/:id", async (c) => {
  const articleID = c.req.param("id"); // Get the dynamic parameter 'id'

  const article = await getArticle(articleID);
  if (!article) {
    c.status(404);
    return c.json({ message: `No such article as ${articleID}`, status: 404 });
  }

  let ArticleContent = LZString.decompress(article.article_content);

  const data = {
    Name: article.article_name,
    Content: ArticleContent,
    Description: article.article_description,
    Author: article.author,
    edited: article.date_edited,
    published: article.date_published,
  };

  c.status(200);
  return c.html(<ArticleShow Data={data} />);
});
