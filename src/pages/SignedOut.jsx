import { Link } from "react-router-dom";
import classes from "./SignedOut.module.css";

function SignedOut() {
  return (
    <div className={classes.mainContainer}>
      <Link to="/" className={classes.backLink}>
        &larr; Back to Home
      </Link>
      <div className={classes.imageContainer}>
        <img
          src="/signed-out.png"
          height="400"
          width="400"
          className={classes.image}
        />
      </div>
    </div>
  );
}

export default SignedOut;
