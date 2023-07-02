import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { useFormAndValidation } from "../hooks/useFormAndValidation.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, handleChange, setValues, errors, isValid, resetForm } =
    useFormAndValidation({
      place: "",
      link: "",
    });

  //очищаем инпуты после успешного добавления карточки,  для того чтобы пользователь мог сразу же еще раз добавить что-то новое и ему не пришлось бы очищать инпуты вручную перед этим.
  React.useEffect(() => {
    resetForm();
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      return;
    }
    // передаём значения управляемых компонентов во внешний обработчик
    onAddPlace(values.place, values.link);
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
        name="place"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        value={values.place || ""}
        onChange={handleChange}
        required
      />
      <span
        className={`form__error ${errors.place ? "form__error_visible" : ""}`}
        id="picture-title-error"
      >
        {errors.place}
      </span>
      <input
        type="url"
        className="form__item form__item_type_picture-link"
        aria-describedby="picture-link-error"
        id="picture-link"
        name="link"
        placeholder="Ссылка на картинку"
        value={values.link || ""}
        onChange={handleChange}
        required
      />
      <span
        className={`form__error ${errors.link ? "form__error_visible" : ""}`}
        id="picture-link-error"
      >
        {errors.link}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
