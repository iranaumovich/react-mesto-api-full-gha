import React from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation.js";
import AuthForm from "./AuthForm.js";

function Login({ handleLogin }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation({
      email: "",
      password: "",
    });

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      return;
    }
    const { email, password } = values;
    handleLogin(email, password);
    resetForm();
  }

  return (
    <AuthForm
      headerText="Вход"
      buttonText="Войти"
      handleSubmit={handleSubmit}
      emailValue={values.email}
      passwordValue={values.password}
      handleChange={handleChange}
      errors={errors}
    />
  );
}

export default Login;
