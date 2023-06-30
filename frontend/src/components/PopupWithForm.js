import React from "react";
import usePopupClose from "../hooks/usePopupClose.js";

function PopupWithForm({
  name,
  title,
  children,
  buttonText,
  onClose,
  isOpen,
  onSubmit,
}) {
  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <h2 className="popup__heading">{title}</h2>
        <form className={`form form_type_${name}`} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="form__button">
            {buttonText}
          </button>
        </form>
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
