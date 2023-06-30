import React from "react";
import mestoLogo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={mestoLogo}
        alt="Логотип сервиса Место"
      />
    </header>
  );
}

export default Header;
