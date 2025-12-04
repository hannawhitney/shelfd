import { Link, useLoaderData } from "react-router-dom";
import classes from "./News.module.css";

function NewsPage() {
  const articles = useLoaderData();

  return (
    <>
      <div className={classes.newsContainer}>
        <h1 className={classes.newsTitle}>Latest Book News</h1>

        <section className={classes.newsList}>
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/news/${article.id}`}
              className={classes.newsCard}
            >
              <img
                src={`https://www.google.com/s2/favicons?domain=${
                  new URL(article.url).hostname
                }`}
                alt="site logo"
              />
              <div>
                <h2>{article.title}</h2>
                <h3>By: {article.author}</h3>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}

export default NewsPage;

export async function articlesLoader({ params }) {
  const response = await fetch(
    "https://shelfd-9cb9b-default-rtdb.firebaseio.com/articles.json"
  );

  if (!response.ok) {
    throw json({ message: "Could not fetch articles" }, { status: 500 });
  }

  const data = await response.json();

  const loadedArticles = [];

  for (const key in data) {
    loadedArticles.push({
      id: key,
      title: data[key].title,
      url: data[key].url,
      author: data[key].author,
    });
  }

  return loadedArticles;
}
