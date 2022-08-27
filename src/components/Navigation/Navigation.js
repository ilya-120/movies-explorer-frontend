import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Navigation.css'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Navigation({ loggedIn, isMenuOpen, onClicOpen }) {
  const currentUser = useContext(CurrentUserContext);
  const adminUser = currentUser.admin;
  return (
    <nav className="navigation">
      <ul className={`navigation__menu-button-null ${loggedIn && 'navigation__menu-button'}`} onClick={onClicOpen}>
        <li className={`${loggedIn && isMenuOpen && 'navigation__button_action_close'}`}></li>
        <li className={`${loggedIn && !isMenuOpen && 'navigation__button_action_open'}`}></li>
        <li className={`${loggedIn && !isMenuOpen && 'navigation__button_action_open'}`}></li>
      </ul>
      {!loggedIn ?
        (<>
          <Link to="/signup" className='header__link header__link_nologgedIn'>Регистрация</Link>
          <Link to="/signin" className='header__button'>
            <p className='header__button-text'>Войти</p>
          </Link>
        </>) : (<>
          <div className="header__menu">
            <Link to="/movies" className="header__link header__link_isloggedIn">Фильмы</Link>
            <Link to="/saved-movies" className="header__link header__link_isloggedIn">Сохранённые фильмы</Link>
            {adminUser === true ?
              (<Link to="/admin" className="header__link header__link_isloggedIn">Администрирование</Link>) : ('')}
            <Link to="/profile" className="header__button header__button_isloggedIn">
              <p className='header__button-text header__button-text_isloggedIn'>Аккаунт</p>
            </Link>
          </div>
        </>)}
      <div className={`header__burger-menu ${isMenuOpen && 'header__burger-menu_activ'}`}>
        <NavLink to="/" className={(navData) => (navData.isActive ? 'header__link_burger-menu_activ header__link' : 'header__link_burger-menu header__link')}>Главная</NavLink>
        <NavLink to="/movies" className={(navData) => (navData.isActive ? 'header__link_burger-menu_activ header__link' : 'header__link_burger-menu header__link')}>Фильмы</NavLink>
        <NavLink to="/saved-movies" className={(navData) => (navData.isActive ? 'header__link_burger-menu_activ header__link' : 'header__link_burger-menu header__link')}>Сохранённые фильмы</NavLink>
        {adminUser === true ?
              (<NavLink to="/admin" className={(navData) => (navData.isActive ? 'header__link_burger-menu_activ header__link' : 'header__link_burger-menu header__link')}>Администрирование</NavLink>) : ('')}
        <Link to="/profile" className="header__button header__button_isloggedIn header__button_burger-menu">
          <p className='header__button-text header__button-text_isloggedIn'>Аккаунт</p>
        </Link>
      </div>
    </nav >
  )
}

export default Navigation
