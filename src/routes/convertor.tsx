import { Hono } from "hono";
import { debugLog } from "..";

import { audioWithStreamInputAndOut } from "bun-ffmpeg";
import { MiddlewareHandler } from "../modules/database";
import { bearerAuth } from "hono/bearer-auth";

import { Convertor } from "../pages/convertor";

export const convert_app = new Hono();

// get mime type from filetype
const mimeTypeMap: Record<string, string> = {
    wav: "audio/wav",
    mp3: "audio/mpeg",
    ogg: "audio/ogg",
};

const codecMap: Record<string, string> = {
    mp3: "libmp3lame",
    wav: "pcm_s16le",
    ogg: "libvorbis"
};

// blacklisted mime types
const blacklistedMimeTypes = [
    "audio/midi",
    "audio/x-midi",
    "audio/mid",
    "audio/x-mid",
    "audio/x-matroska",
    "audio/webm",
];

const processaudio = async (stream: ReadableStream, codec: string) => {
    return new Promise<any>((resolve) => {
        audioWithStreamInputAndOut(stream, {
            onProcessDataFlushed: () => {},
            onProcessDataEnd: (data) => { resolve(data)},
        }, {
            codec: codec,
        })
    })
};

convert_app.get('/', (c) => {
    return c.html(<Convertor />)
});

convert_app.use('/upload', bearerAuth({
    verifyToken: MiddlewareHandler
  })
)
convert_app.post('/upload', async (c) => {
    try {
        const contentType = c.req.header("content-type") || "";
        if (!contentType.startsWith("multipart/form-data")) {
            return c.json({ success: false, error: "Content-Type must be multipart/form-data" }, 400);
        }

        const formData = await c.req.formData();
        const file = formData.get("file"); // "file" is the input name
        const filetype = formData.get("output"); // "output" is the desired output format

        debugLog("Desired output format:", filetype);

        if (!file) {
            return c.json({ success: false, error: "No file uploaded" }, 400);
        }

        if (!(file instanceof Blob)) {
            return c.json({ success: false, error: "Uploaded file is not a valid Blob" }, 400);
        }
        
        const isAudio = file.type.startsWith("audio/");
        if(!isAudio) {
            return c.json({ success: false, error: "Uploaded file is not an audio file" }, 400);
        }

        if(blacklistedMimeTypes.includes(file.type)) {
            return c.json({ success: false, error: `Audio files of type ${file.type} are not supported` }, 400);
        }

        debugLog(`File Info: name=${file.name}, size=${file.size}, type=${file.type}`);

        if(filetype !== "wav" && filetype !== "mp3" && filetype !== "ogg") {
            return c.json({ success: false, error: "Output file type must be one of: wav, mp3, ogg" }, 400);
        }


        const mimeType = mimeTypeMap[filetype as keyof typeof mimeTypeMap];
        const codec = codecMap[filetype as keyof typeof codecMap];

        debugLog("MIME type for output:", mimeType);
        const result = await processaudio(file.stream(), codec!);
        debugLog("Conversion result size:", result?.byteLength || 0);

        return new Response(result, { headers: { "Content-Type": mimeType,  "Content-Disposition": `attachment; filename="converted_${Math.floor(Date.now() / 1000)}.${filetype}"` } });
    } catch (error) {
        console.error("Error processing upload:", error);
        return c.json({ success: false, error: "Error processing upload" }, 500);
    }
});