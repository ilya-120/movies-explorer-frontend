import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ loggedIn, isMenuOpen, onClicOpen }) {
  return (
    <header className={`header ${loggedIn && 'header_isloggedIn'}`}>
      <Link to="/">
        <img
          src={logo}
          alt="Логотип"
          className={`header__logo ${loggedIn && 'header__logo_isloggedIn'}`}
        />
      </Link>
      <Navigation
        loggedIn={loggedIn}
        isMenuOpen={isMenuOpen}
        onClicOpen={onClicOpen}
      />
    </header>
  )
}

export default Header
