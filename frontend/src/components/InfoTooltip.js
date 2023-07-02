import React from "react";
import successTooltip from "../images/success-tooltip.svg";
import errorTooltip from "../images/error-tooltip.svg";

function InfoTooltip({ isOpen, onClose, isError }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_type_tooltip">
        <img
          className="popup__tooltip-image"
          src={!isError ? successTooltip : errorTooltip}
          alt="успешная регистрация"
        />
        <h3 className="popup__tooltip-subtitle">
          {isError
            ? "Что-то пошло не так! Попробуйте еще раз."
            : "Вы успешно зарегистрировались"}
        </h3>
        <button
          type="button"
          className="popup__close-button popup__close-button_type_image"
          aria-label="кнопка чтобы закрыть информационное окно"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
