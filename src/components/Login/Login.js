import React from 'react';
import { Link } from 'react-router-dom';
import '../Login/Login.css';
import UseForm from '../UseForm';
import logo from '../../images/logo.svg';

function Login({ onLogin }) {
  const { enteredValues, errors, isFormValid, handleChange } = UseForm({});
  function handleSubmit(evt) {
    evt.preventDefault();
    if (!enteredValues.email || !enteredValues.password || !isFormValid) {
      console.log(isFormValid);
      return;
    }
    onLogin(enteredValues.email, enteredValues.password);
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
        <h2 className="login__title">Рады видеть!</h2>
        <label className="login__label">E-mail</label>
        <input
          className="login__input"
          aria-label="Ваша почта"
          type="Email"
          name="email"
          id="email"
          placeholder=""
          required
          minLength="2"
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
          minLength="6"
          maxLength="200"
          onChange={handleChange}
          value={enteredValues.password || ''}
        />
        <span id="password-error" className="login__error">{errors.password}</span>
        <button type="submit" className="login__button">Войти</button>
        <p className="login__subtitle">Еще не зарегистрированы? <Link to="/signup" className="login__link">Регистрация</Link></p>
      </form>
    </section>
  )
}

export default Login;

