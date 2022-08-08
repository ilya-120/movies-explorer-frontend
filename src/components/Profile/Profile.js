import React, { useContext } from 'react';
import './Profile.css'
import '../Login/Login.css';
import Header from '../Header/Header.js';
import { Link } from 'react-router-dom';
import UseForm from '../UseForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ loggedIn,
  isMenuOpen,
  onClicOpen,
  onUpdateProfile,
  onClick,
  onClickCloseMenu }) {
  const currentUser = useContext(CurrentUserContext);
  const { enteredValues, errors, isFormValid, handleChange } = UseForm({});
  const isNotChange = Boolean(currentUser.email === enteredValues.email && currentUser.name === enteredValues.name);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!enteredValues.name || !enteredValues.email || !isFormValid) {
      return;
    }
    onUpdateProfile(enteredValues.name, enteredValues.email);
  }
  return (
    <>
      <div className={`${isMenuOpen && 'background-overlay_activ'}`}
        onClick={onClickCloseMenu}></div>
      <Header
        loggedIn={loggedIn}
        isMenuOpen={isMenuOpen}
        onClicOpen={onClicOpen}
      />
      <section className="profile">
        <form className="form profile__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <div className="profile__input-container">
            <label className="profile__label">Имя</label>
            <input
              className="input login__input"
              aria-label="Имя"
              type="Text"
              name="name"
              id="profileName"
              placeholder={''}
              required
              pattern="[A-Za-zА-Яа-яЁё\s-]{2,30}"
              onChange={handleChange}
              value={enteredValues.name || currentUser.name}
            />
          </div>
          <span id="name-error" className="login__error">{errors.name}</span>
          <div className="profile__input-container">
            <label className="profile__label">E-mail</label>
            <input
              className="input login__input"
              aria-label="Ваша почта"
              type="Email"
              name="email"
              id="profileEmail"
              placeholder={''}
              required
              onChange={handleChange}
              value={enteredValues.email || currentUser.email}
            />
          </div>
          <span id="email-error" className="login__error">{errors.email}</span>
          <button
            type="submit"
            className={`login__button login__button_profile ${(isFormValid && !isNotChange) ? '' : 'login__button_profile_disabled'}`}
            disabled={!isFormValid || isNotChange}
          >Редактировать</button>
          <Link to="/signin" className="login__link login__link_profile" onClick={onClick}>Выйти из аккаунта</Link>
        </form>
      </section>
    </>
  )
}

export default Profile
