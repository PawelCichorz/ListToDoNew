import "./login.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

function Login(props) {
  const history = useNavigate();
  const [email, Setemail] = useState("");
  const [password, Setpass] = useState("");
  const [error, Seterror] = useState("");

  async function handleSubmitL(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3031/logowanie", {
        email: email,
        password: password,
      });
      props.onLoginSuccess(response.config.data);
      console.log(response.config.data);
      history("/notes");
    } catch (error) {
      console.log(error.message);
      Seterror("Nieprawidłowy email lub hasło");
    }
  }

  return (
    <form className="form" method="POST" onSubmit={handleSubmitL}>
      <div className="email">
        <label> Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => Setemail(e.target.value)}
          className="loginone"
        ></input>
      </div>

      <div className="password">
        <label> Hasło:</label>
        <input
          type="Password"
          name="password"
          value={password}
          onChange={(e) => Setpass(e.target.value)}
          className="logintwo"
        ></input>
      </div>
      <p>{error}</p>
      <button className="buttonLogin">ZALOGUJ</button>
    </form>
  );
}

export default Login;
