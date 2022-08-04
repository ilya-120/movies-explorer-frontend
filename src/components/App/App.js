import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import './App.css';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { movies } from '../../utils/movies-list';
import { favoriteMovies } from '../../utils/favorite-movies-list';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as auth from '../../utils/MainApi';

function App() {

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  function handleMenuOpen() {
    setMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            setName(res.name);
          }
        })
        .catch((err) => {
          console.log(`Ошибка проверки токена: ${err}`);
          setLoggedIn(false);
        });
    }
  }, []);

  function onLogin(email, password) {
    auth
      .signin(email, password)
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setDataInfo();
        }
      })
      .catch((err) => {
        setIsRegistrationSuccessful(false);
        console.log(`Ошибка входа: ${err}`);
      })
      .finally(() => {
        navigate('/movies');
      })
  }

  function setDataInfo() {
    const jwt = localStorage.getItem('jwt');
    auth
      .checkToken(jwt)
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email, id: res._id })
        setEmail(res.email);
        setName(res.name);
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных: ${err}`)
      });
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        console.log("esc")
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return () =>
      document.removeEventListener('keydown', handleEscClose);
  }

  function onRegister(email, password, name) {
    auth
      .signup(email, password, name)
      .then(res => {
        if (res._id) {
          setIsRegistrationSuccessful(true);
          navigate('/signin');
        } else {
          setIsRegistrationSuccessful(false);
        }
      })
      .catch((err) => {
        setIsRegistrationSuccessful(false);
        console.log(`Ошибка регистрации: ${err}`);
      })
      .finally(() =>
        console.log(isRegistrationSuccessful)
      );
  }

  function handleUpdateProfile(name, email) {
    const jwt = localStorage.getItem('jwt');
    auth
      .setUserInfo(jwt, name, email)
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email, id: res._id })
        setEmail(res.email);
        setName(res.name);
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных: ${err}`)
      })
      .finally(() =>
        console.log("Успешно")
      );
  }

  function onSignOut() {
    setLoggedIn(false);
    setEmail('');
    setName('');
    navigate('/signin');
    localStorage.removeItem('jwt');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Routes>
          <>
            <Route path="/"
              element={
                <Main
                  loggedIn={loggedIn}
                  isMenuOpen={isMenuOpen}
                  onClicOpen={handleMenuOpen}
                />
              } />
            <Route path="/signup"
              element={
                <Register
                  onRegister={onRegister}
                />
              } />
            <Route path="/signin"
              element={
                <Login
                  onLogin={onLogin} />
              } />
            <Route path="/profile"
              element={
                <Profile
                  loggedIn={loggedIn}
                  userName={name}
                  email={email}
                  isMenuOpen={isMenuOpen}
                  onClicOpen={handleMenuOpen}
                  onUpdateProfile={handleUpdateProfile}
                  onClick={onSignOut}
                />
              } />
            <Route path="/movies"
              element={
                <Movies
                  loggedIn={loggedIn}
                  movies={movies}
                  isMenuOpen={isMenuOpen}
                  onClicOpen={handleMenuOpen}
                />
              } />
            <Route path="/saved-movies"
              element={
                <SavedMovies loggedIn={loggedIn}
                  movies={favoriteMovies}
                  isMenuOpen={isMenuOpen}
                  onClicOpen={handleMenuOpen}
                />
              } />
            <Route path="*"
              element={
                <NotFound />
              } />
          </>
        </Routes>
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
