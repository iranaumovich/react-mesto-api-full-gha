import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  // записываем объект, возвращаемый хуком, в переменную
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

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
        id="avatar-link"
        name="avatar-link"
        placeholder="Ссылка на аватар"
        required
      />
      <span className="form__error" id="avatar-link-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
