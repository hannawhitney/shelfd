import React, { useEffect } from "react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import classes from "./Login.module.css";
import { useUser } from "../context/UserContext";

function LoginPage() {
  const { setUser } = useUser();
  const actionData = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.userId) {
      console.log(actionData);
      setUser(actionData);
      navigate("/bookshelf");
    }
  }, [actionData]);

  return (
    <div className={classes.page}>
      <h1 className={classes.title}>Login</h1>
      <Form className={classes.form} method="post">
        <label className={classes.label} htmlFor="email">
          Email Address
        </label>
        <input
          className={classes.input}
          type="email"
          id="email"
          name="email"
          placeholder="you@example.com"
        />

        <label className={classes.label} htmlFor="password">
          Password
        </label>
        <input
          className={classes.input}
          type="password"
          id="password"
          name="password"
          placeholder="••••••••"
        />

        <button type="submit" className={classes.button}>
          Login
        </button>
        <Link className={classes.link} to="/signup">
          Don't have an account? Sign up
        </Link>
      </Form>
      {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
    </div>
  );
}

export default LoginPage;

export async function action({ request }) {
  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(
    "https://shelfd-9cb9b-default-rtdb.firebaseio.com/users.json"
  );

  const users = await response.json();

  const loginUser = Object.entries(users).find(
    ([userId, userInfo]) => userInfo.email === authData.email
  );

  if (!loginUser) {
    console.log("no match email");
    return { error: "Email address may be incorrect or not found" };
  }

  const [userId, userInfo] = loginUser;

  if (userInfo.password !== authData.password) {
    console.log("no match password");

    return { error: "Password does not match" };
  }

  console.log("Success");
  return {
    userId,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    bookshelf: userInfo.bookshelf,
  };
}
