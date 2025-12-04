import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import classes from "./Welcome.module.css";

function WelcomePage() {
  const { user } = useUser();

  return (
    <div className={classes.page}>
      <div className={classes.card}>
        <h1 className={classes.title}>Welcome, {user.firstName}!</h1>
        <p className={classes.subtitle}>
          Your account has been created successfully.
        </p>
        <Link to="/browse" className={classes.button}>
          Go to Browse
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
