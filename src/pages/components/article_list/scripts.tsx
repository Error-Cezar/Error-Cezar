import { html } from "hono/html";

export const scripts = () => {
  return html`
    <script type="module" src="https://md-block.verou.me/md-block.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="/js/modules/lz-string.js"></script>
    <script src="/js/articles/new.js"></script>
  `;
};