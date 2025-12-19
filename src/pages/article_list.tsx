import { body_el } from "./components/article_list/body/body";
import { ArticleListLayout } from "./components/article_list/layout";

export const ArticleList = (props: { Data: any }) => {
  return (
    <ArticleListLayout title={"meow"}>{body_el(props.Data)}</ArticleListLayout>
  );
};
