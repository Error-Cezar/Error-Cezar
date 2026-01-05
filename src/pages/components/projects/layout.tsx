import { html } from "hono/html";
import { meta } from "./meta";
import { hcss } from "./css";

import { scripts } from "./scripts";

export const ProjectsLayout = (props: { title: string; children?: any }) => {
  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        ${meta()} ${hcss()}
      </head>
      <body>
        ${props.children}
      </body>
      ${scripts()}
    </html>`;
};
