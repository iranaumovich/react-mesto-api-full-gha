import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { useFormAndValidation } from "../hooks/useFormAndValidation.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  // записываем объект, возвращаемый хуком, в переменную
  const avatarRef = React.useRef();

  const { values, handleChange, errors, isValid } = useFormAndValidation({
    name: "",
    about: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      return;
    }
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        className="form__item form__item_type_avatar-link"
        aria-describedby="avatar-link-error"
        id="avatarlink"
        name="avatarlink"
        placeholder="Ссылка на аватар"
        value={values.avatarlink || ""}
        onChange={handleChange}
        required
      />
      <span
        className={`form__error ${
          errors.avatarlink ? "form__error_visible" : ""
        }`}
        id="avatar-link-error"
      >
        {errors.avatarlink}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
