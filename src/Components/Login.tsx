import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const EmailDiv = styled.div`
  margin-bottom: 20px;
`;
const PasswordDiv = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  font-size: 15px;
  padding: 10px 25px;
  margin-left: 8px;
`;

const Button = styled.button`
  background-color: grey;
  border-radius: 8px;
  padding: 7px 13px;
`;

interface LoginProps {
  onLoginSuccess: (data: any) => void;
}

function Login(props: LoginProps) {
  const history = useNavigate();
  const [email, Setemail] = useState<string>("");
  const [password, Setpass] = useState<string>("");
  const [error, Seterror] = useState<string>("");

  async function handleSubmitL(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3031/logowanie", {
        email: email,
        password: password,
      });
      props.onLoginSuccess(response.config.data);
      console.log(response.config.data);
      history("/notes");
    } catch (error: any) {
      console.log(error.message);
      Seterror("Nieprawidłowy email lub hasło");
    }
  }

  return (
    <Container method="POST" onSubmit={handleSubmitL}>
      <EmailDiv>
        <label> Email:</label>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => Setemail(e.target.value)}
        ></Input>
      </EmailDiv>

      <PasswordDiv className="password">
        <label> Hasło:</label>
        <Input
          type="Password"
          name="password"
          value={password}
          onChange={(e) => Setpass(e.target.value)}
        ></Input>
      </PasswordDiv>
      <p>{error}</p>
      <Button>ZALOGUJ</Button>
    </Container>
  );
}

export default Login;
