import Banner from "../components/Banner";
import BestSellersList from "../components/BestSellersList";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function HomePage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/browse?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className={classes.homeContainer}>
      <header className={classes.heroSection}>
        <h1>Welcome to Shelf'd!</h1>
        <p>
          Discover your next favorite read with Shelf'd! Browse trending books,
          explore curated lists, or search for titles you’ve been meaning to
          read. Sign in to create your personal bookshelf and keep track of all
          the stories you want to dive into.
        </p>

        <section className={classes.searchSection}>
          <input
            type="text"
            placeholder="Search by book, author, or genre..."
            className={classes.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={classes.searchButton} onClick={handleSearch}>
            Search
          </button>
        </section>
      </header>

      <section className={classes.bannerSection}>
        <Banner />
      </section>

      <BestSellersList />

      <section className={classes.ctaSection}>
        <h2>Start your personal bookshelf today!</h2>
        <p>
          Sign up to save your favorite books, track your reading, and get
          recommendations tailored to you.
        </p>
        <Link to="/signup" className={classes.ctaButton}>
          Sign Up
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
