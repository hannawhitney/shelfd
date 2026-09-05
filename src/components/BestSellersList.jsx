import axios from "axios";
import { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import classes from "./BestSellersList.module.css";
import { Link } from "react-router-dom";

function BestSellersList() {
  const [bestBooks, setBestBooks] = useState([]);
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=LeMpchYQaG1q3IVxFonWtTusbevjKeD4",
      )
      .then((res) => setBestBooks(res.data.results.books))
      .catch((err) => setError(err.message));
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={classes.container}>
      <h1>Check out NYT Best Sellers</h1>
      {error && <p>{error}</p>}
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={3000}
        pause="hover"
        indicators={false}
      >
        {bestBooks.map((book) => (
          <Carousel.Item
            key={book.primary_isbn13}
            className={classes.carouselItem}
          >
            <img
              src={book.book_image}
              alt={book.title}
              className={classes.bookImage}
            />
            <h2>{book.title}</h2>
            <h3>{book.author}</h3>
            <p>{book.description}</p>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className={classes.customIndicators}>
        {bestBooks.map((_, idx) => (
          <button
            key={idx}
            className={index === idx ? classes.activeDot : classes.dot}
            onClick={() => setIndex(idx)}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default BestSellersList;
