import React from "react";
import { CurrentUserContext } from "../components/CurrentUserContext.js";

function Card(props) {
  function handleClick() {
    props.onClick(props.card);
  }

  // подписываем на контекст данных пользователя компонент Card, в userData попадает значение пропса value провайдера
  const userData = React.useContext(CurrentUserContext);

  //определяем являемся ли мы владельцем карточки и в jsx добавляем кнопку удаления только на нашу карточку
  const isOwn = props.card.owner._id === userData.currentUser.id;

  // определяем, есть ли у карточки лайк, поставленный текущим пользователем, если есть - добавляем в jsx класс
  const isLiked = props.card.likes.some(
    (elem) => elem._id === userData.currentUser.id
  );

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="places__item">
      {isOwn && (
        <button
          type="button"
          className="places__trash-button"
          aria-label="кнопка для удаления фотографии"
          onClick={handleDeleteClick}
        ></button>
      )}
      <article className="place">
        <img
          className="place__image"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick}
        />
        <div className="place__description">
          <h2 className="place__title">{props.card.name}</h2>
          <button
            type="button"
            className={`place__like-button ${
              isLiked && "place__like-button_active"
            }`}
            aria-label="кнопка-лайк на фотографию"
            onClick={handleLikeClick}
          >
            <span className="place__like-counter">
              {props.card.likes.length}
            </span>
          </button>
        </div>
      </article>
    </li>
  );
}

export default Card;
