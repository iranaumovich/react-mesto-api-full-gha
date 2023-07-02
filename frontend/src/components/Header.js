import React from "react";
import mestoLogo from "../images/logo.svg";
import MobileMenu from "./MobileMenu.js";
import { CurrentUserContext } from "../components/CurrentUserContext.js";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header(props) {
  const userData = React.useContext(CurrentUserContext);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  };

  function signOut() {
    localStorage.removeItem("token");
    props.onLogout();
    navigate("/sign-in", { replace: true });
  }

  let container = null;

  if (userData.loggedIn) {
    container = (
      <>
        <div className="header__account header__account_type_desktop">
          <h3 className="header__email">{props.userEmail}</h3>
          <Link
            to="/sign-in"
            className="header__link header__link_type_logout"
            onClick={signOut}
          >
            Выйти
          </Link>
        </div>
        <div
          className="header__account header__account_type_mobile"
          onClick={toggleMobileMenu}
        >
          <span
            className={
              !isMenuOpen
                ? "header__burger"
                : "header__burger header__burger_active"
            }
          />
        </div>
      </>
    );
  } else if (location.pathname === "/sign-in") {
    container = (
      <div className="header__account">
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      </div>
    );
  } else if (location.pathname === "/sign-up") {
    container = (
      <div className="header__account">
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      </div>
    );
  }

  return (
    <header className="header">
      <MobileMenu
        userEmail={props.userEmail}
        handleClick={signOut}
        isOpen={isMenuOpen}
      />
      <div className="header__container">
        <img
          className="header__logo"
          src={mestoLogo}
          alt="Логотип сервиса Место"
        />
        {container}
      </div>
    </header>
  );
}

export default Header;
