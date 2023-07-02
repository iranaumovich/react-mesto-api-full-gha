import React from "react";
import { Link } from "react-router-dom";

function MobileMenu({ userEmail, handleClick, isOpen }) {
  return (
    <div
      className={`header__mobile-container ${
        isOpen && "header__mobile-container_active"
      }`}
    >
      <div className="header__mobile-menu">
        <h3 className="header__email">{userEmail}</h3>
        <Link
          to="/sign-in"
          className="header__link header__link_type_logout"
          onClick={handleClick}
        >
          Выйти
        </Link>
      </div>
    </div>
  );
}

export default MobileMenu;
