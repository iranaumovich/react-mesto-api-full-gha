import React, { useCallback } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import profileAvatar from '../images/profile-avatar.jpg';
import InfoTooltip from './InfoTooltip.js';

import Register from './Register.js';
import Login from './Login.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProtectedRouteElement from './ProtectedRoute';
import * as auth from '../utils/auth.js';

import '../index.css';
import api from '../utils/api.js';
import { CurrentUserContext } from '../components/CurrentUserContext.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    id: '',
    name: 'Христофор Колумб',
    description: 'Исследователь земель',
    avatar: profileAvatar,
    email: '',
  });
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const navigate = useNavigate();

  const tokenCheck = useCallback(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');

      if (token) {
        auth
          .getContentByToken(token)
          .then((res) => {
            if (res) {
              api.setAuthToken(token);
              setLoggedIn(true);
              setCurrentUser({
                id: res._id,
                avatar: res.avatar,
                email: res.email,
                name: res.name,
                description: res.about,
              });
              navigate('/mesto', { replace: true });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, []);

  //проверяем токен при загрузке страницы, чтобы узнать авторизован ли пользователь
  React.useEffect(() => {
    !loggedIn && tokenCheck();
  }, [tokenCheck, loggedIn]);

  //делаем запрос на сервер за начальными данными - юзера и карточек, обновляем стейт-переменную из полученного от сервера значения.
  React.useEffect(() => {
    function acc() {
      Promise.all([api.getUserInfoFromServer(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser({
            id: userData._id,
            name: userData.name,
            email: userData.email,
            description: userData.about,
            avatar: userData.avatar,
          });
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    loggedIn && acc();
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((elem) => elem === currentUser.id);

    // отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((elem) => (elem._id === card._id ? newCard : elem))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((elem) => (elem._id === card._id ? false : true))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(name, description) {
    api
      .editUserInfo(name, description)
      .then((userData) => {
        setCurrentUser({
          name: userData.name,
          description: userData.about,
          avatar: userData.avatar,
          id: userData._id,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .changeAvatar(avatar)
      .then((userData) => {
        setCurrentUser({
          name: userData.name,
          description: userData.about,
          avatar: userData.avatar,
          id: userData._id,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSubmit(place, link) {
    api
      .addNewCard(place, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        console.log(res);
        setIsError(false);
        setIsInfoTooltipOpen(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          api.setAuthToken(data.token);
          setLoggedIn(true);
          navigate('/mesto', { replace: true });
        }
      })
      .catch((err) => {
        setIsError(true);
        setIsInfoTooltipOpen(true);
        console.log(err);
      });
  }

  function handleLogout() {
    setLoggedIn(false);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    //подключаем контекст userData, оборачиваем в него все содержимое компонента App,
    //контекст возвращает то, что записано в value
    <CurrentUserContext.Provider value={{ currentUser, loggedIn }}>
      <div className="page">
        <div className="container">
          <Header userEmail={currentUser.email} onLogout={handleLogout} />
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/mesto" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route
              path="/mesto"
              element={
                <ProtectedRouteElement
                  element={Main}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/sign-up"
              element={<Register handleRegister={handleRegister} />}
            />
            <Route
              path="/sign-in"
              element={<Login handleLogin={handleLogin} />}
            />
          </Routes>
          {loggedIn && <Footer />}

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={() => setIsInfoTooltipOpen(false)}
            isError={isError}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
