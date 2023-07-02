import React from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation.js";
import AuthForm from "./AuthForm.js";

function Register({ handleRegister }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      return;
    }
    const { email, password } = values;
    handleRegister(email, password);
  }

  return (
    <AuthForm
      headerText="Регистрация"
      buttonText="Зарегистрироваться"
      linkText="Уже зарегистрированы? Войти"
      handleSubmit={handleSubmit}
      emailValue={values.email}
      passwordValue={values.password}
      handleChange={handleChange}
      errors={errors}
    />
  );
}

export default Register;
