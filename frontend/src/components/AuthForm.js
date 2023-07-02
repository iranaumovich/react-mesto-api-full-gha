import React from "react";
import { Link } from "react-router-dom";

function AuthForm({
  headerText,
  buttonText,
  handleSubmit,
  emailValue,
  passwordValue,
  handleChange,
  linkText,
  errors,
}) {
  return (
    <div className="entrance">
      <h2 className="entrance__header">{headerText}</h2>
      <form
        noValidate
        className="form form_type_entrance"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          className="form__item form__item_type_entrance"
          aria-describedby="email-input-error"
          id="email"
          name="email"
          placeholder="Email"
          value={emailValue || ""}
          onChange={handleChange}
          required
        />
        <span
          className={`form__error ${errors.email ? "form__error_visible" : ""}`}
          id="email-input-error"
        >
          {errors.email}
        </span>
        <input
          type="password"
          className="form__item form__item_type_entrance"
          aria-describedby="password-input-error"
          id="password"
          name="password"
          placeholder="Пароль"
          value={passwordValue || ""}
          onChange={handleChange}
          required
        />
        <span
          className={`form__error ${
            errors.password ? "form__error_visible" : ""
          }`}
          id="password-input-error"
        >
          {errors.password}
        </span>
        <button
          type="submit"
          className="form__button form__button_type_entrance"
        >
          {buttonText}
        </button>
      </form>

      <Link to="/sign-in" className="entrance__question">
        {linkText}
      </Link>
    </div>
  );
}

export default AuthForm;
