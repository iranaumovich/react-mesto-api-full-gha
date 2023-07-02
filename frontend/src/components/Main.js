import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../components/CurrentUserContext.js";

function Main(props) {
  // подписываем на контекст данных пользователя компонент Main, в userData попадает значение пропса value провайдера
  const userData = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div onClick={props.onEditAvatar} className="profile__image-container">
          <img
            className="profile__avatar"
            src={userData.currentUser.avatar}
            alt="Аватар"
          />
        </div>

        <article className="profile__info">
          <div className="profile__container">
            <h1 className="profile__title">{userData.currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="кнопка для редактирования профиля"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">
            {userData.currentUser.description}
          </p>
        </article>

        <button
          type="button"
          className="profile__add-button"
          aria-label="кнопка для добавления фотографий в профиль"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section>
        <ul className="places">
          {props.cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
