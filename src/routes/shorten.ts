import { Hono } from "hono";
import { debugLog, pg } from "..";
import { validateRequest } from "../validators/shorten";
import { validator } from "hono/validator";
import { bearerAuth } from "hono/bearer-auth";

export function checkIfValueExists(value: string) {
    return pg`SELECT COUNT(*) FROM shorten WHERE ID = ${value}`.then(result => {
        return result[0].count > 0;
    });
}

export async function ensureShorten(pg: Bun.SQL) {
  console.log("Ensuring 'shorten' table exists...");
  const tableExists = await pg`
    SELECT EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'shorten'
    ) AS exists;
`;

  // If the table does not exist, create it
  if (!tableExists[0].exists) {
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
  const apiTableExists = await pg`
    SELECT EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'apikeys'
    ) AS exists;
`;

  // If the table does not exist, create it
  if (!apiTableExists[0].exists) {
    await pg`
        CREATE TABLE apikeys (
            key VARCHAR(100) PRIMARY KEY
        );
    `;
    console.log("Table 'apikeys' created.");
  } else {
    console.log("Table 'apikeys' already exists.");
  }

}

export function generateRandomShorten(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }   
    return result;
}

async function checkIfKeyExists(key: string) {
    return pg`SELECT COUNT(*) FROM apikeys WHERE key = ${key}`.then(result => {
        return result[0].count > 0;
    });
}

export const short_app = new Hono();

short_app.get('/', (c) => {
    return c.json({meow: true})
})

short_app.get('/new', (c) => {
    return c.json({meow: true})
})


short_app.use('/new', bearerAuth({
    verifyToken: async (token, c) => {
        const stat = await checkIfKeyExists(token);
        return stat
    },
  })
)
short_app.post('/new', validator("json", validateRequest), async (c) => {
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

short_app.use(
  '/key',
  bearerAuth({
    verifyToken: async (token, c) => {
      return token === process.env.ADMIN_KEY;
    },
  })
)
short_app.post('/key', async (c) => {
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

short_app.get("/:id", async (c) => {
    const shorten = c.req.param('id'); // Get the dynamic parameter 'id'
    debugLog("checking for shorten:", shorten);
    try {
        const result = await pg`SELECT link FROM shorten WHERE ID = ${shorten}`
        if (result.length === 0) {
            debugLog("Shorten not found:", shorten);
            c.status(404);
            return c.json({error: "Shorten not found"});
        }  
        debugLog("Found shorten:", shorten, "->", result[0].link);
        return c.redirect(result[0].link);
    } catch (e) {
        c.status(500);
        console.error(e);
        return c.json({error: "Internal server error"});
    }
})