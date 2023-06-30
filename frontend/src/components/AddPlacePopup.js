import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [place, setPlace] = React.useState("");
  const [link, setLink] = React.useState("");

  //привязываем стейт переменные к полям ввода, делаем их управляемыми, передаем в обработчик onChange
  function handleAddPlace(e) {
    setPlace(e.target.value);
  }

  function handleAddLink(e) {
    setLink(e.target.value);
  }

  //очищаем инпуты после успешного добавления карточки,  для того чтобы пользователь мог сразу же еще раз добавить что-то новое и ему не пришлось бы очищать инпуты вручную перед этим.
  React.useEffect(() => {
    setPlace("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    // запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // передаём значения управляемых компонентов во внешний обработчик
    onAddPlace(place, link);
  }

  return (
    <PopupWithForm
      name="add-form"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="form__item form__item_type_picture-title"
        aria-describedby="picture-title-error"
        id="picture-title"
        name="picture-title"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        value={place}
        onChange={handleAddPlace}
        required
      />
      <span className="form__error" id="picture-title-error"></span>
      <input
        type="url"
        className="form__item form__item_type_picture-link"
        aria-describedby="picture-link-error"
        id="picture-link"
        name="picture-link"
        placeholder="Ссылка на картинку"
        value={link}
        onChange={handleAddLink}
        required
      />
      <span className="form__error" id="picture-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
