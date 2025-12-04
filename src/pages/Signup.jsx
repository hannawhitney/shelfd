import React, { useState } from "react";
import classes from "./Signup.module.css";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { firstName, lastName, email, password };

    try {
      const response = await fetch(
        "https://shelfd-9cb9b-default-rtdb.firebaseio.com/users.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();
      const firebaseId = data.name;

      if (!response.ok) {
        setMessage("Failed to create account");
      } else {
        setMessage("Account created successfully!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");

        const newUser = { firstName, lastName, email };
        setUser({ ...user, id: firebaseId, bookshelf: [] });
        navigate("/welcome");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error submitting form");
    }
  };

  return (
    <div className={classes.page}>
      <h1 className={classes.title}>Sign Up</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label className={classes.label}>First Name</label>
        <input
          className={classes.input}
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <label className={classes.label}>Last Name</label>
        <input
          className={classes.input}
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label className={classes.label}>Email</label>
        <input
          className={classes.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className={classes.label}>Password</label>
        <input
          className={classes.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className={classes.button} type="submit">
          Sign Up
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
