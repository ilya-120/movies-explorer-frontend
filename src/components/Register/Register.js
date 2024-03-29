import React from 'react';
import { Link } from 'react-router-dom';
import '../Login/Login.css';
import UseForm from '../UseForm';
import logo from '../../images/logo.svg';
import Preloader from '../Preloader/Preloader';

function Register({ onRegister, showPreloader }) {
  const { enteredValues, errors, isFormValid, handleChange } = UseForm({});
  function handleSubmit(evt) {
    evt.preventDefault();
    if (!enteredValues.name || !enteredValues.email || !enteredValues.password || !isFormValid) {
      return;
    }
    onRegister(enteredValues.name, enteredValues.email, enteredValues.password);
  }

  return (
    <section className="login">
      <form className="form login__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <Link to="/">
          <img
            src={logo}
            alt="Логотип"
            className="login__logo"
          />
        </Link>
        <h2 className="login__title">Добро пожаловать!</h2>
        <Preloader showPreloader={showPreloader} />
        <label className="login__label">Имя</label>
        <input
          className="login__input"
          aria-label="Имя"
          type="Text"
          name="name"
          id="name"
          placeholder=""
          required
          pattern="[A-Za-zА-Яа-яЁё\s-]{2,30}"
          onChange={handleChange}
          value={enteredValues.name || ''}
        />
        <span id="name-error" className="login__error">{!isFormValid && errors.name ? 'Поле Имя от 2 до 30 символов, содержит только латиницу, кириллицу, пробел или дефис.' : ''}</span>
        <label className="login__label">E-mail</label>
        <input
          className="login__input login__input_blue"
          aria-label="Ваша почта"
          type="Email"
          name="email"
          id="email"
          placeholder=""
          required
          minLength="4"
          maxLength="50"
          onChange={handleChange}
          value={enteredValues.email || ''}
        />
        <span id="email-error" className="login__error">{errors.email}</span>
        <label className="login__label">Пароль</label>
        <input
          className="login__input"
          aria-label="Пароль"
          type="Password"
          name="password"
          id="password"
          placeholder=""
          required
          pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*"
          onChange={handleChange}
          value={enteredValues.password || ''}
        />
        <span id="password-error" className="login__error">{!isFormValid && errors.password ? 'Поле пароля: Минимум 8 символов, одна цифра, одна буква в верхнем регистре и одна в нижнем.' : ''}</span>
        <button
          type="submit"
          disabled={!isFormValid}
          className={isFormValid ? 'login__button login__button_register' : 'login__button login__button_register login__button_disabled'}
        >Зарегистрироваться</button>
        <p className="login__subtitle">Уже зарегистрированы? <Link to="/signin" className="login__link">Войти</Link></p>
      </form>
    </section>
  )
}

export default Register;
