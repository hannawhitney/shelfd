import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./Article.module.css";

function ArticlePage() {
  const article = useLoaderData(); 

  return (
    <>
      <div className={classes.articleContainer}>
        <Link to="/news" className={classes.backLink}>
          &larr; Back to News
        </Link>

        <h1 className={classes.articleTitle}>{article.title}</h1>

        <div className={classes.iframeWrapper}>
          {article.url ? (
            <iframe
              src={article.url}
              title={article.title}
              className={classes.iframe}
            />
          ) : (
            <p>No preview available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ArticlePage;

export async function articleDetailLoader({ params }) {
  const id = params.articleId;

  const response = await fetch(
    "https://shelfd-9cb9b-default-rtdb.firebaseio.com/articles.json"
  );

  if (!response.ok) {
    throw json({ message: "Could not fetch article" }, { status: 500 });
  }

  const data = await response.json();

  const article = data[id];

  if (!article) {
    throw json({ message: "Article not found" }, { status: 404 });
  }

  return {
    id,
    title: article.title,
    url: article.url,
  };
}
