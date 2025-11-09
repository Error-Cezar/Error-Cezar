import { html } from "hono/html";

import { meta } from "./meta";
import { hcss } from "./css";
import { shortafter } from "./body/after";

export const ShortenLayout = (props: { title: string; children?: any }) => {
  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        ${meta()} ${hcss()}
      </head>
      <body class="bg-dark">
        ${props.children}
      </body>
      ${shortafter()}
    </html>`;
};
