import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";

import { loginBackend } from "../backend";
import * as S from "./LoginStyles";

type LoginProps = {
  onLoginSuccess: (data: any) => void;
};

function Login({ onLoginSuccess }: LoginProps) {
  const history = useNavigate();
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (value: any) => {
    try {
      const response = await loginBackend(
        getValues("email"),
        getValues("password"),
      );
      onLoginSuccess(response.config.data);
      history("/notes");
    } catch (error: any) {
      setError("Nieprawidłowy email lub hasło");
    }
    console.log(value);
  };

  return (
    <S.Container method="POST" onSubmit={handleSubmit(onSubmit)}>
      <S.EmailDiv>
        <label>Email:</label>
        <S.Input
          type="email"
          {...register("email", { required: "Email jest wymagany" })}
        />
        {errors.email ? (
          <p> {errors.email.message as React.ReactNode} </p>
        ) : null}
      </S.EmailDiv>
      <S.PasswordDiv className="password">
        <label>Hasło:</label>
        <S.Input
          type="password"
          {...register("password", { required: "Hasło jest wymagane" })}
        />
        {errors.password && <p>{errors.password.message as React.ReactNode}</p>}
      </S.PasswordDiv>
      <p>{error}</p>
      <S.Button>ZALOGUJ</S.Button>
    </S.Container>
  );
}

export default Login;
