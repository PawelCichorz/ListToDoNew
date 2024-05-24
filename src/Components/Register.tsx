import axios from "axios";
import { useState, useEffect, FormEvent } from "react";
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

function Register() {
  const history = useNavigate();
  const [email, Setemail] = useState<string>("");
  const [password, Setpass] = useState<string>("");
  const [error, Seterror] = useState<string>("");
  const [errop, Seterrop] = useState<string>("");

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
    <Container className="form" method="POST" onSubmit={handleSubmit}>
      <EmailDiv className="email">
        <label> Email:</label>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => Setemail(e.target.value)}
          className="inputone"
        ></Input>
        <p>{error}</p>
      </EmailDiv>

      <PasswordDiv className="password">
        <label> Hasło:</label>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={(e) => Setpass(e.target.value)}
          className="inputtwo"
        ></Input>
        <p>{errop}</p>
      </PasswordDiv>

      <Button>ZAREJESTRUJ</Button>
    </Container>
  );
}

export default Register;
