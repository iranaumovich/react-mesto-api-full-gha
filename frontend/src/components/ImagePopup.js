import React from "react";
import usePopupClose from "../hooks/usePopupClose.js";

function ImagePopup({ card, onClose }) {
  usePopupClose(card, onClose);

  if (!card) {
    return null;
  }

  return (
    <div className={`popup popup_type_image ${card && "popup_opened"}`}>
      <div className="popup__image-container">
        <img className="popup__image" src={card.link} alt={card.name} />
        <h3 className="popup__image-subtitle">{card.name}</h3>
        <button
          type="button"
          className="popup__close-button popup__close-button_type_image"
          aria-label="кнопка чтобы закрыть картинку"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
