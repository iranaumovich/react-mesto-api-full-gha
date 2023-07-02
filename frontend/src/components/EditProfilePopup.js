import React from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation.js";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../components/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  //подписываемся на контекст
  const userData = React.useContext(CurrentUserContext);
  //создаем стейт переменные имени и описания профиля

  const { values, handleChange, setValues, errors, isValid } =
    useFormAndValidation({
      name: "",
      about: "",
    });

  // после загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  //следим за isOpen (состоянием открытия), иначе если удалить информацию из инпутов и просто закрыть попап, то при следующем открытии инпуты будут пустые
  React.useEffect(() => {
    setValues({
      name: userData.currentUser.name,
      about: userData.currentUser.description,
    });
  }, [userData, isOpen]);

  function handleSubmit(e) {
    // запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    if (!isValid) {
      return;
    }
    // передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(values.name, values.about);
  }

  console.log(errors);

  return (
    <PopupWithForm
      name="edit-form"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="form__item form__item_type_name"
        aria-describedby="name-input-error"
        id="name"
        name="name"
        placeholder="Ваше имя"
        minLength="2"
        maxLength="40"
        value={values.name}
        onChange={handleChange}
        required
      />
      <span
        className={`form__error ${errors.name ? "form__error_visible" : ""}`}
        id="name-input-error"
      >
        {errors.name}
      </span>
      <input
        type="text"
        className="form__item form__item_type_description"
        aria-describedby="about-input-error"
        id="about"
        name="about"
        placeholder="Пару слов о себе"
        minLength="2"
        maxLength="200"
        value={values.about}
        onChange={handleChange}
        required
      />
      <span
        className={`form__error ${errors.about ? "form__error_visible" : ""}`}
        id="about-input-error"
      >
        {errors.about}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
