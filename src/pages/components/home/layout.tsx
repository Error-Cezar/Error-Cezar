import { html } from "hono/html";
import { before } from "./body/before";

import { meta } from "./meta";
import { hcss } from "./css";

import { scripts } from "./scripts";

export const HomeLayout = (props: { title: string; children?: any }) => {
  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        ${meta()} ${hcss()}
      </head>
      ${before()}
      <body class="bg-dark">
        ${props.children}
      </body>
      ${scripts()}
    </html>`;
};
