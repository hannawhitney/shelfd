import { json, redirect, useLoaderData } from "react-router-dom";
import classes from "./BookDetails.module.css";
import { useUser } from "../context/UserContext";
import { useState } from "react";

function BookDetails() {
  const { user, setUser } = useUser();
  const [message, setMessage] = useState("");

  const data = useLoaderData();
  const book = data.items[0].volumeInfo;

  async function addBookHandler() {
    if (!user) {
      location.replace("/login");
      return;
    }

    const updatedBookshelf = user.bookshelf ? [...user.bookshelf] : [];

    if (updatedBookshelf.includes(data.items[0].id)) {
      setMessage("This book is already in your shelf!");
      return;
    }

    updatedBookshelf.push(data.items[0].id);

    try {
      const userId = user.id;
      const response = await fetch(
        `https://shelfd-9cb9b-default-rtdb.firebaseio.com/users/${userId}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookshelf: updatedBookshelf }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update bookshelf");
      }

      setUser({ ...user, bookshelf: updatedBookshelf });
      setMessage("Book added to your shelf!");
    } catch (err) {
      console.error(err);
      setMessage("There was an error adding the book.");
    }
  }

  return (
    <div className={classes.page}>
      <article className={classes.main}>
        <h1 className={classes.title}>{book.title}</h1>

        {book.imageLinks?.thumbnail && (
          <div className={classes.coverWrap}>
            <img
              src={book.imageLinks.thumbnail}
              alt={book.title}
              className={classes.cover}
            />
          </div>
        )}

        <h3 className={classes.author}>{book.authors?.join(", ")}</h3>

        {book.description && (
          <p className={classes.description}>{book.description}</p>
        )}

        <button className={classes.button} onClick={addBookHandler}>
          Add to shelf
        </button>

        {message && <p>{message}</p>}
      </article>

      <section className={classes.sidebar}>
        <h3 className={classes.sectionTitle}>About this book</h3>

        <p>
          <strong>Publish date:</strong> {book.publishedDate}
        </p>
        <p>
          <strong>Pages:</strong> {book.pageCount}
        </p>
        <p>
          <strong>Genre:</strong> {book.categories?.join(", ")}
        </p>

        {book.averageRating && (
          <p>
            <strong>Average Rating:</strong> {book.averageRating} (
            {book.ratingsCount})
          </p>
        )}

        {book.previewLink && (
          <p>
            <a
              href={book.previewLink}
              className={classes.previewLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Preview book <i className="bi bi-arrow-right-square"></i>
            </a>
          </p>
        )}
      </section>
    </div>
  );
}

export default BookDetails;

export async function bookDetailLoader({ params }) {
  const id = params.bookId;

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${id}&key=AIzaSyApg_xea7hfSRNTO0_P3Pd9guYX380E_JM`,
  );

  if (!response.ok) {
    throw json({ message: "Could not fetch book details" }, { status: 500 });
  }

  return response;
}
