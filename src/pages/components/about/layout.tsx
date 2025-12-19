import { html } from "hono/html";
import { meta } from "./meta";
import { hcss } from "./css";

import { scripts } from "./scripts";

import { pizza } from "../../shared/pizza";

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
        ${pizza()} ${props.children}
      </body>
      ${scripts()}
    </html>`;
};
