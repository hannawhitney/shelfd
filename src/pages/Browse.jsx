import { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Browse.module.css";
import { Link, useLocation } from "react-router-dom";

function BrowsePage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialSearch = params.get("search") || "subject:fiction";

  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [inputValue, setInputValue] = useState(
    params.get("search") ? initialSearch : ""
  );
  const fetchBooks = () => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&orderBy=newest&maxResults=40&key=AIzaSyApg_xea7hfSRNTO0_P3Pd9guYX380E_JM`
      )
      .then((res) => setBooks(res.data.items))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    fetchBooks();
  }, [searchTerm]);

  const handleSearch = () => {
    setSearchTerm(inputValue);
  };

  return (
    <>
      <h2>Browse books</h2>

      <section className={classes.searchSection}>
        <input
          type="text"
          className={classes.searchInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search by book, author, or genre..."
        />
        <button className={classes.searchButton} onClick={handleSearch}>
          Search
        </button>
      </section>

      <div>
        {error && <p>{error}</p>}
        <div className={classes.bookgrid}>
          {books.map((book) => (
            <div key={book.id} className={classes.bookcard}>
              <div className={classes.bookinfo}>
                <h2>{book.volumeInfo.title}</h2>
                {book.volumeInfo.imageLinks?.smallThumbnail && (
                  <img
                    src={book.volumeInfo.imageLinks.smallThumbnail}
                    className={classes.bookimage}
                    alt={book.volumeInfo.title}
                  />
                )}
                <h3>{book.volumeInfo.authors}</h3>
                <Link
                  to={`/${book.volumeInfo.title}+${book.volumeInfo.authors}`}
                >
                  See more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BrowsePage;
