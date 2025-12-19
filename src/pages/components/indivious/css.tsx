import { html } from 'hono/html'

export const hcss = () => {
  return html`
    <link rel="preconnect" href="https://api.fonts.coollabs.io" crossorigin />
    <link href="https://api.fonts.coollabs.io/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" />

    <link rel="stylesheet" type="text/css" href="styles/about/main.css">
`
};
