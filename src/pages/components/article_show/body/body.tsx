import { navbar } from "../../../shared/navbar";

export const body_el = (Content: {
  Name: string;
  Description: string;
  Content: string;
  Author: string;
  published: string;
  edited?: string;
}) => {
  return (
    <>
      {navbar()}
      <article class="blog-article glass-navbar">
        <header>
          <h1 class="article-title"> {Content.Name} </h1>
          <p class="article-description"> {Content.Description} </p>
        </header>
        <section class="article-content">
          <md-block id="article-markdown">
            {Content.Content}
          </md-block>
        </section>
        <div class="article-meta">
          <span class="author">By Jane Doe</span>
          <span class="publish-time">Published: {Content.published} </span>
          <span class="edit-date">Last edited: {Content.edited || "N/A"} </span>
        </div>
      </article>
    </>
  );
};
