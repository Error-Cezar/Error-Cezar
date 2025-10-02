import { html } from 'hono/html'

import { meta } from './convertor/meta';
import { hcss } from './convertor/css'
import { shortafter } from './convertor/body/after';

export const ConvertorLayout = (props: { title: string; children?: any }) => {
  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        ${meta()}
        ${hcss()}
      </head>
      <body class="bg-dark">
        ${props.children}
      </body>
      ${shortafter()}
    </html>`
}
