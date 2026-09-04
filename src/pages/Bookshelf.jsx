import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import classes from "./Bookshelf.module.css";
import { Link } from "react-router-dom";

function BookshelfPage() {
  const { user, setUser } = useUser();
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user || !user.bookshelf || user.bookshelf.length === 0) return;

    const fetchBooks = async () => {
      try {
        const bookDetails = await Promise.all(
          user.bookshelf.map(async (bookId) => {
            const res = await fetch(
              `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyApg_xea7hfSRNTO0_P3Pd9guYX380E_JM`,
            );
            const data = await res.json();
            return data;
          }),
        );
        setBooks(bookDetails.filter((b) => b && b.volumeInfo));
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooks();
  }, [user]);

  const removeBookHandler = async (bookId) => {
    if (!user) return;

    const updatedBookshelf = user.bookshelf.filter((id) => id !== bookId);

    try {
      const response = await fetch(
        `https://shelfd-9cb9b-default-rtdb.firebaseio.com/users/${user.id}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookshelf: updatedBookshelf }),
        },
      );

      if (!response.ok) throw new Error("Failed to update bookshelf");

      setUser({ ...user, bookshelf: updatedBookshelf });
      setBooks(books.filter((b) => b.id !== bookId));
      setMessage("Book removed from your shelf!");
    } catch (err) {
      console.error(err);
      setMessage("There was an error removing the book.");
    }
  };

  if (!user) {
    return (
      <p className={classes.loading}>
        Be sure to sign in to access your shelf!
      </p>
    );
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{user.firstName}'s Shelf Page</h1>
      {message && <p>{message}</p>}
      {books.length === 0 ? (
        <p className={classes.empty}>No books in your shelf yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {books.map((book) => {
            const info = book.volumeInfo || {};
            const thumbnail = info.imageLinks?.thumbnail;
            return (
              <div
                key={book.id}
                style={{
                  background: "#2a2a2a",
                  color: "#f6f3ee",
                  padding: "1rem",
                  borderRadius: "6px",
                  textAlign: "center",
                  boxShadow: "0px 6px 16px rgba(0,0,0,0.35)",
                }}
              >
                {thumbnail && (
                  <img
                    src={thumbnail}
                    alt={info.title || "Book"}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "6px",
                      marginBottom: "0.5rem",
                    }}
                  />
                )}
                <h2 style={{ fontSize: "1rem", margin: "0.5rem 0" }}>
                  {info.title || "Unknown title"}
                </h2>
                {info.authors && (
                  <h3
                    style={{
                      fontSize: "0.85rem",
                      color: "#b6ada5",
                      margin: "0",
                    }}
                  >
                    {info.authors.join(", ")}
                  </h3>
                )}
                <div className={classes.buttonGroup}>
                  <Link
                    to={`/${book.volumeInfo.title}+${book.volumeInfo.authors}`}
                    className={classes.seeMoreButton}
                  >
                    See More
                  </Link>
                  <button
                    onClick={() => removeBookHandler(book.id)}
                    className={classes.removeButton}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BookshelfPage;
