import type { Context } from "hono";
import { checkIfValueExists, generateRandomShorten } from "../modules/database";

type requestType = {link?: string, shorten?: string};
type requestReturn = string | requestType;

const blacklist: string[] = ["new", "list", "key", "admin"]

export const validateRequest = async (value: requestType, c: Context): Promise<requestReturn> => {
    // check if link is present and in an url format
    if(!value.link) {
        c.status(400);
        return "Link is required";
    }

    // check if url is a valid url using regex
    const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/i;
    if(!urlRegex.test(value.link)) {
        c.status(400);
        return "Link must be a valid URL";
    }

    // check if shorten is present and is alphanumeric and between 3 and 20 characters
    if(value.shorten) {
        if(!/^[a-zA-Z0-9]{3,20}$/.test(value.shorten)) {
            c.status(400);
            return "Shorten must be alphanumeric and between 3 and 20 characters";
        }
    } else {
        value.shorten = generateRandomShorten(5);
    }

    if(blacklist.includes(value.shorten.toLowerCase())) {
        c.status(400);
        return "Link is blacklisted";
    }

    if (await checkIfValueExists(value.shorten)) {
        c.status(409);
        return "Shorten already exists";
    }

    return value;
};