import { html } from 'hono/html'
import { before } from './home/before';

import { meta } from './home/meta';
import { hcss } from './home/css';

import { scripts } from './home/scripts'

export const HomeLayout = (props: { title: string; children?: any }) => {
  return html`<!DOCTYPE html>
    <html>
      <head>
        ${meta()}
        ${hcss()}
      </head>
      ${before()}
      <body class="bg-dark">
        ${props.children}
      </body>
      ${scripts()}
    </html>`
}