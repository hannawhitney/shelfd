import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "/logo.jpg";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function MainNavigation() {
  const navigate = useNavigate();

  const { user, setUser } = useUser();

  const handleSignOut = () => {
    setUser(null);
    navigate("/signedout");
  };

  return (
    <header className={classes.nav}>
      <div className={classes.logo}>
        <img src={logo} className={classes.image} />
      </div>
      <nav className={classes.links}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : classes.link
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/browse"
              className={({ isActive }) =>
                isActive ? classes.active : classes.link
              }
            >
              Browse
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                isActive ? classes.active : classes.link
              }
            >
              News
            </NavLink>
          </li>

          {user && (
            <>
              <li>
                <NavLink
                  to="/bookshelf"
                  className={({ isActive }) =>
                    isActive ? classes.active : classes.link
                  }
                >
                  Book Shelf
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className={classes.link}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Sign Out
                </button>
              </li>
            </>
          )}
          {!user && (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? classes.active : classes.link
                }
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <div className={classes.woodBar}></div>
    </header>
  );
}

export default MainNavigation;
