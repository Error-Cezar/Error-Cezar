import { html } from "hono/html";
import { meta } from "./meta";
import { hcss } from "./css";

import { scripts } from "./scripts";

export const AboutLayout = (props: { title: string; children?: any }) => {
  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        ${meta()} ${hcss()}
      </head>
      <style>
        body {
          background: linear-gradient(to bottom, black, darkblue) !important;
        }
      </style>
      <body>
        ${props.children}
      </body>
      ${scripts()}
    </html>`;
};
