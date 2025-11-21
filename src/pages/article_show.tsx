import { body_el } from "./components/article_show/body/body";
import { ArticleShowLayout } from "./components/article_show/layout";

export const ArticleShow = (props: { Data: any }) => {
  return (
    <ArticleShowLayout title={"meow"}>{body_el(props.Data)}</ArticleShowLayout>
  );
};
