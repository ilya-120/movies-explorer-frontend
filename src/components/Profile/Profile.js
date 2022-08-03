import React from 'react';
import './Profile.css'
import '../Login/Login.css';
import Header from '../Header/Header.js';
import { Link } from 'react-router-dom';
import UseForm from '../UseForm';

function Profile({ loggedIn, userName, email, isMenuOpen, onClicOpen }) {
  const { enteredValues, errors, isFormValid, handleChange } = UseForm({});
  function handleSubmit(evt) {
    evt.preventDefault();
    if (!enteredValues.name || !enteredValues.email || !isFormValid) {
      console.log(isFormValid);
      return;
    }
  }
  return (
    <>
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
          <h2 className="profile__title">Привет, {userName}!</h2>
          <div className="profile__input-container">
            <label className="profile__label">Имя</label>
            <input
              className="input login__input"
              aria-label="Имя"
              type="Text"
              name="name"
              id="profileName"
              required
              onChange={handleChange}
              value={enteredValues.name || userName}
            />
            <span id="name-error" className="login__error">{errors.name}</span>
          </div>
          <div className="profile__input-container">
            <label className="profile__label">E-mail</label>
            <input
              className="input login__input"
              aria-label="Ваша почта"
              type="Email"
              name="email"
              id="profileEmail"
              required
              onChange={handleChange}
              value={enteredValues.email || email}
            />
            <span id="email-error" className="login__error">{errors.email}</span>
          </div>
          <button type="submit" className="login__button login__button_profile">Редактировать</button>
          <Link to="/signin" className="login__link login__link_profile">Выйти из аккаунта</Link>
        </form>
      </section>
    </>
  )
}

export default Profile
