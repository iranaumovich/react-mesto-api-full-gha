import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../components/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  //подписываемся на контекст
  const currentUser = React.useContext(CurrentUserContext);
  //создаем стейт переменные имени и описания профиля
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // после загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  //следим за isOpen (состоянием открытия), иначе если удалить информацию из инпутов и просто закрыть попап, то при следующем открытии инпуты будут пустые
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.description);
  }, [currentUser, isOpen]);

  //привязываем стейт переменные к полям ввода, делаем их управляемыми, передаем в обработчик onChange
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(name, description);
  }

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
        value={name}
        onChange={handleChangeName}
        required
      />
      <span className="form__error" id="name-input-error"></span>
      <input
        type="text"
        className="form__item form__item_type_description"
        aria-describedby="about-input-error"
        id="about"
        name="about"
        placeholder="Пару слов о себе"
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleChangeDescription}
        required
      />
      <span className="form__error" id="about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
