import { Article, ArticlesProps } from "./../../Interfaces";
import Card from "./Card/Card";
const Articles = (props: ArticlesProps) => {
  return (
    <main className="articles">
      {props.displayedArticles.map((article: Article, i: number) => {
        return <Card article={article} i={i} />;
      })}
    </main>
  );
};

export default Articles;
