import { Hono } from "hono";
import { Top } from "../pages/main";
import { getConnInfo } from 'hono/bun'

import { randomUUIDv7 } from "bun";
import { pg, debugLog } from "..";

import { checkIfIpExists, getTotalVisits } from "../modules/database";

export const site_app = new Hono();

// Function to hash a string using SHA-256
async function hashString(inputString: string): Promise<string> {
    const hash = new Bun.CryptoHasher("sha256", process.env.HASH_SECRET || "default-secret");
    hash.update(inputString);
    
    // Finalize the hash and get the result in hex format
    const result = hash.digest('hex');
    return result;
}

site_app.use('/', async (c, next) => {
    const IP = getConnInfo(c).remote.address ?? randomUUIDv7();
    const hash = await hashString(IP);

    if (!await checkIfIpExists(hash)) {
        const CURRENT_TIMESTAMP = new Date().toISOString();
        debugLog("IP does not exist, creating new visit");
        await pg`INSERT INTO visits (id, last, total) VALUES (${hash}, ${CURRENT_TIMESTAMP}, 1)`;
    } else {
        debugLog("IP exists, skipping creation");
    }

    await next();
    c.header('x-message', 'Visit sucessful, welcome stalker!');
})
site_app.get('/', async (c) => {
    let totalv = await getTotalVisits()
    return c.html(<Top visitCount={totalv} />)
});

site_app.get('/maxie', async (c) => {
  return c.text("https://iamawesome.com/ is a silly site\nand apparently maxie is a pretty cat")
});
