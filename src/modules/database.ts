import type { Context } from "hono";
import { pg } from "..";

async function EnsureExists(Name: string) {
  const tableExists = await pg`
      SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_name = ${Name}
      ) AS exists;
    `;

  return tableExists[0].exists;
}

export async function checkIfValueExists(value: string) {
  const result = await pg`SELECT COUNT(*) FROM shorten WHERE ID = ${value}`;
  return result[0].count > 0;
}

export async function checkIfArticleExists(ID: string) {
  const result = await pg`SELECT COUNT(*) FROM articles WHERE ID = ${ID}`;
  return result[0].count > 0;
}

export async function getArticle(ID: string) {
  const result = await pg`SELECT * FROM articles WHERE ID = ${ID}`;
  if (result.length == 0) return false;
  return result[0];
}

export async function ensureShorten(pg: Bun.SQL) {
  console.log("Ensuring 'shorten' table exists...");
  if (!(await EnsureExists("shorten"))) {
    await pg`
        CREATE TABLE shorten (
            ID VARCHAR(20) PRIMARY KEY,
            link TEXT NOT NULL,
            timestamp TIMESTAMP NOT NULL
        );
    `;
    console.log("Table 'shorten' created.");
  } else {
    console.log("Table 'shorten' already exists.");
  }

  console.log("Ensuring 'apikeys' table exists...");
  if (!(await EnsureExists("apikeys"))) {
    await pg`
        CREATE TABLE apikeys (
            key VARCHAR(100) PRIMARY KEY
        );
    `;
    console.log("Table 'apikeys' created.");
  } else {
    console.log("Table 'apikeys' already exists.");
  }

  console.log("Ensuring 'visits' table exists...");
  if (!(await EnsureExists("visits"))) {
    await pg`
    CREATE TABLE visits (
        id VARCHAR PRIMARY KEY,
        last TIMESTAMP,
        total INTEGER
    );
    `;
    console.log("Table 'visits' created.");
  } else {
    console.log("Table 'visits' already exists.");
  }

  console.log("Ensuring 'articles' table exists...");
  // If the table does not exist, create it
  if (!(await EnsureExists("articles"))) {
    await pg`
    CREATE TABLE articles (
        ID VARCHAR(20) PRIMARY KEY,
        article_name VARCHAR(200) NOT NULL,
        article_content TEXT NOT NULL,
        article_description VARCHAR(200),
        date_published DATE NOT NULL,
        date_edited DATE,
        author VARCHAR(50) NOT NULL
    );
    `;
    console.log("Table 'articles' created.");
  } else {
    console.log("Table 'articles' already exists.");
  }
}

export function generateRandomShorten(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function checkIfKeyExists(key: string) {
  return pg`SELECT COUNT(*) FROM apikeys WHERE key = ${key}`
    .then((result) => {
      return result[0].count > 0;
    })
    .catch(() => false);
}

export async function checkIfIpExists(ip: string) {
  return pg`SELECT COUNT(*) FROM visits WHERE id = ${ip}`
    .then((result) => {
      return result[0].count > 0;
    })
    .catch(() => false);
}

export async function getTotalVisits() {
  return pg`SELECT SUM(total) as total FROM visits`
    .then((result) => {
      return (result[0].total as number) || 0;
    })
    .catch(() => 0);
}

export const MiddlewareHandler = async (token: string, c: Context) => {
  const stat = await checkIfKeyExists(token);
  return stat;
};
