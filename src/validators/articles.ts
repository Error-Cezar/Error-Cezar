import type { Context } from "hono";
import { checkIfValueExists, generateRandomShorten } from "../modules/database";

type requestType = {Title?: string, Description?: string, Content?: string, Author?: string};
type requestReturn = string | requestType;


export const validateRequest = async (value: requestType, c: Context): Promise<requestReturn> => {
    // check if link is present and in an url format
    if(!value.Title || !value.Description || !value.Content || !value.Author) {
        c.status(400);
        return "Values are missing";
    }
    

    if(value.Title.length > 200) {
        c.status(400)
        return "Title is too long"
    }

    if(value.Description.length > 200) {
        c.status(400)
        return "Description is too long"
    }

    if(value.Author.length > 50) {
        c.status(400)
        return "Author is too long"
    }

    return value;
};