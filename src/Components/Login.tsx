import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { loginBackend } from "../backend";
import * as S from "./LoginStyles";

type LoginProps = {
  onLoginSuccess: (data: any) => void;
};

function Login({ onLoginSuccess }: LoginProps) {
  const history = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function handleSubmitL(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await loginBackend(email, password);
      onLoginSuccess(response.data);
      history("/notes");
    } catch (error: any) {
      setError("Nieprawidłowy email lub hasło");
    }
  }

  return (
    <S.Container method="POST" onSubmit={handleSubmitL}>
      <S.EmailDiv>
        <label> Email:</label>
        <S.Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></S.Input>
      </S.EmailDiv>

      <S.PasswordDiv className="password">
        <label> Hasło:</label>
        <S.Input
          type="Password"
          name="password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
        ></S.Input>
      </S.PasswordDiv>
      <p>{error}</p>
      <S.Button>ZALOGUJ</S.Button>
    </S.Container>
  );
}

export default Login;
