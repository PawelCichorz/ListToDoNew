import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import * as S from "./LoginStyles";
import { registerBackend } from "../backend";
import { passwordValidate, emailValidate } from "./registerValidate";

function Register() {
  const history = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [errop, setErrop] = useState<string>("");

  useEffect(() => {
    if (emailValidate(email)) {
      setError("");
    } else if (email.length > 0 && emailValidate(email) === false) {
      setError("Niepoprawny email");
    } else if (email.length == 0) {
      setError("");
    }
  }, [email]);
  useEffect(() => {
    if (passwordValidate(password)) {
      setErrop("");
    } else if (password.length > 0 && passwordValidate(password) === false) {
      setErrop(
        "Hasło musi zawierać minimum 4 znaki ,duże i małe litery oraz liczbę!",
      );
    } else if (password.length == 0) {
      setErrop("");
    }
  }, [password]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await registerBackend(email, password);
      history("/logowanie");
    } catch (error) {
      console.error("Błąd podczas rejestracji:", error);
    }
  }
  return (
    <S.Container className="form" method="POST" onSubmit={handleSubmit}>
      <S.EmailDiv className="email">
        <label> Email:</label>
        <S.Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputone"
        ></S.Input>
        <p>{error}</p>
      </S.EmailDiv>

      <S.PasswordDiv className="password">
        <label> Hasło:</label>
        <S.Input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          className="inputtwo"
        ></S.Input>
        <p>{errop}</p>
      </S.PasswordDiv>

      <S.Button>ZAREJESTRUJ</S.Button>
    </S.Container>
  );
}

export default Register;
