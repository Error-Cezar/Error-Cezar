import { body_el } from "./components/article_new/body/body";
import { ArticleNewLayout } from "./components/article_new/layout";

export const ArticleNew = () => {
  return <ArticleNewLayout title={"meow"}>{body_el()}</ArticleNewLayout>;
};
