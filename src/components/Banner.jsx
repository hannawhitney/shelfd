import { Link } from "react-router-dom";
import classes from "./Banner.module.css";

function Banner() {
  return (
    <div className={classes.banner}>
      <div className={classes.content}>
        <h1 className={classes.title}>
          Shelf'd supports The King's English Bookshop!
        </h1>
        <img
          src="https://cdn1.bookmanager.com/i/1254375/main_logo.png?cb=1717692237"
          className={classes.highlightImage}
        />
        <p className={classes.text}>
          In our weekly spotlight, we call attention to The King's English
          Bookshop! Discover some of what makes The King's English one of the
          most unique and inviting bookstores anywhere. From new releases to
          exclusive pre-orders, The King's English has it all. Be sure to review
          their{" "}
          <Link to="https://www.kingsenglish.com/events" target="_blank">
            calendar
          </Link>{" "}
          to see this months bookish events.
        </p>
      </div>
    </div>
  );
}

export default Banner;
