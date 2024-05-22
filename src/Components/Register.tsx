import "./register.css";
import axios from "axios";
import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

function Register() {
  const history = useNavigate();
  const [email, Setemail] = useState<string>("");
  const [password, Setpass] = useState<string>("");
  const [error, Seterror] = useState<string>("");
  const [errop, Seterrop] = useState<string>("");

  // const auth =useContext(authContex)

  const emailValidate = (text: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;
    return re.test(text);
  };

  const passwordValidate = (text: string) => {
    const low = /[a-z]/g;
    const row = /[A-Z]/g;
    const nums = /[1-9]/g;

    if (low.test(text) && row.test(text) && nums.test(text)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (emailValidate(email)) {
      Seterror("");
    } else if (email.length > 0 && emailValidate(email) === false) {
      Seterror("Niepoprawny email");
    } else if (email.length == 0) {
      Seterror("");
    }
  }, [email]);
  useEffect(() => {
    if (passwordValidate(password)) {
      Seterrop("");
    } else if (password.length > 0 && passwordValidate(password) === false) {
      Seterrop(
        "Hasło musi zawierać minimum 4 znaki ,duże i małe litery oraz liczbę!",
      );
    } else if (password.length == 0) {
      Seterrop("");
    }
  }, [password]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3031/zarejestruj", {
        email: email,
        password: password,
      });
      history("/logowanie");
    } catch (error) {
      console.error("Błąd podczas rejestracji:", error);
    }
  }
  return (
    <form className="form" method="POST" onSubmit={handleSubmit}>
      <div className="email">
        <label> Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => Setemail(e.target.value)}
          className="inputone"
        ></input>
        <p>{error}</p>
      </div>

      <div className="password">
        <label> Hasło:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => Setpass(e.target.value)}
          className="inputtwo"
        ></input>
        <p>{errop}</p>
      </div>

      <button className="buttonregister">ZAREJESTRUJ</button>
    </form>
  );
}

export default Register;
