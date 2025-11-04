import { html } from "hono/html";
import { meta } from "./about/meta";
import { hcss } from "./about/css";

export const AboutLayout = (props: { title: string; children?: any }) => {
  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        ${meta()} ${hcss()}
      </head>
      <body class="bg-dark">
        ${props.children}
      </body>
    </html>`;
};
