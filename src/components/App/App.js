import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import './App.css';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute';
import * as auth from '../../utils/MainApi';
import InfoTooltip from '../../components/Popup/InfoTooltip';
import { mainApi } from '../../utils/MainApi';
import VideoPopup from '../Popup/VideoPopup';
import Admin from '../Admin/Admin';
import EditAvatarPopup from '../Popup/EditAvatarPopup';

function App() {

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isSuccessful, setIsSuccessful] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const [movie, setMovie] = useState({});
  const [users, setUsers] = useState({});
  const [showPreloader, setShowPreloader] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, getFile] = useState({ status: false, name: "", path: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          if (res) {
            setCurrentUser({ name: res.name, email: res.email, id: res._id, admin: res.admin, avatar: res.avatar });
          }
        })
        .catch((err) => {
          console.log(`Ошибка проверки токена: ${err}`);
          setLoggedIn(false);
        });
    }
  }, []);


  function setDataInfo() {
    const jwt = localStorage.getItem('jwt');
    auth
      .checkToken(jwt)
      .then((res) => {
        console.log(res);
        setCurrentUser({ name: res.name, email: res.email, id: res._id, admin: res.admin, avatar: res.avatar })
      })
      .catch((err) => {
        setTooltipText(`Ошибка загрузки данных: ${err}`);
        setIsSuccessful(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function setDataUsers() {
    const jwt = localStorage.getItem('jwt');
    auth
      .getUsers(jwt)
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => {
        setTooltipText(`Ошибка загрузки данных: ${err}`);
        setIsSuccessful(false);
        setIsInfoTooltipOpen(true);
      });
  }


  function handleMenuOpen() {
    setMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    if (loggedIn) {
      if (localStorage.getItem('savedMovies')) {
        setSavedMovies((JSON.parse(localStorage.getItem('savedMovies'))));
      } else {
        getSavedMovies();
      }
    }
  }, [loggedIn])

  useEffect(() => {
    if (currentUser.admin === true) {
      setDataUsers()
    }
    else return
  }, [currentUser])

  function updateSavedMovies(savedMovies) {
    setSavedMovies(savedMovies);
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }

  function getSavedMovies() {
    setShowPreloader(true);
    const jwt = localStorage.getItem('jwt');
    mainApi.getMovies(jwt)
      .then(data => {
        updateSavedMovies(data);
        setIsSearchError(false);
      })
      .catch(err => {
        setTooltipText(`Ошибка загрузки данных: ${err}`);
        setIsSuccessful(false);
        setIsInfoTooltipOpen(true);
        setIsSearchError(true);
      })
      .finally(() => setShowPreloader(false));
  }

  function onMovieSave(movie) {
    const isSaved = savedMovies?.some(i => i.movieId === movie.id);
    const jwt = localStorage.getItem('jwt');
    if (!isSaved) {
      mainApi
        .postMovie(movie, jwt)
        .then((newMovie) => {
          updateSavedMovies([newMovie, ...savedMovies])
          setTooltipText('Фильм успешно добавлен в избранное.');
          setIsSuccessful(true);
          setIsInfoTooltipOpen(true);
        })
        .catch((err) => {
          setTooltipText(`Ошибка загрузки данных: ${err}`);
          setIsSuccessful(false);
          setIsInfoTooltipOpen(true);
        });
    } else {
      const id = savedMovies.find(item => item.movieId === movie.id)._id;
      mainApi
        .deleteMovie(id, jwt)
        .then(() => {
          updateSavedMovies(savedMovies.filter(movie => movie._id === id ? null : movie));
          setTooltipText('Фильм успешно удален из избранного.');
          setIsSuccessful(true);
          setIsInfoTooltipOpen(true);
        })
        .catch((err) => {
          setTooltipText(`Ошибка удаления данных: ${err}`);
          setIsSuccessful(false);
          setIsInfoTooltipOpen(true);
        })
    }
  }

  function onMovieDel(movie) {
    const jwt = localStorage.getItem('jwt');
    const id = movie._id;
    mainApi
      .deleteMovie(id, jwt)
      .then(() => {
        updateSavedMovies(savedMovies.filter(movie => movie._id === id ? null : movie));
        setTooltipText('Фильм успешно удален из избранного.');
        setIsSuccessful(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        setTooltipText(`Ошибка удаления данных: ${err}`);
        setIsSuccessful(false);
        setIsInfoTooltipOpen(true);
      })
  }

  function onUserDel(user) {
    const jwt = localStorage.getItem('jwt');
    const id = user._id;
    auth
      .deleteUser(id, jwt)
      .then(() => {
        setTooltipText('Пользователь успешно удален.');
        setIsSuccessful(true);
        setIsInfoTooltipOpen(true);
        setDataUsers();
      })
      .catch((err) => {
        setTooltipText(`Ошибка удаления данных: ${err}`);
        setIsSuccessful(false);
        setIsInfoTooltipOpen(true);
      })
  }

  function handleUpdateUserProfile(name, email, user) {
    const jwt = localStorage.getItem('jwt');
    const id = user._id;
    auth
      .setEditUserInfo(jwt, name, email, id)
      .then(() => {
        setTooltipText('Данные пользователя успешно изменены.');
        setIsSuccessful(true);
        setIsInfoTooltipOpen(true);
        setDataUsers();
      })
      .catch((err) => {
        setTooltipText(`Ошибка загрузки данных: ${err}`);
        setIsSuccessful(false);
        setIsInfoTooltipOpen(true);
      })
  }

  function onLogin(email, password) {
    setShowPreloader(true);
    auth
      .signin(email, password)
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setDataInfo();
          navigate('/movies');
        }
      })
      .catch((err) => {
        setTooltipText(`Ошибка входа: ${err}`);
        setIsSuccessful(false);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setShowPreloader(false);
      })
  }

  function onRegister(name, email, password) {
    setShowPreloader(true);
    auth
      .signup(name, email, password)
      .then(res => {
        if (res._id) {
          onLogin(email, password)
          setIsSuccessful(true);
          navigate('/movies');
        } else {
          setIsSuccessful(false);
        }
      })
      .catch((err) => {
        setTooltipText(`Ошибка регистрации: ${err}`);
        setIsSuccessful(false);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => setShowPreloader(false));
  }

  function handleUpdateProfile(name, email) {
    const jwt = localStorage.getItem('jwt');
    auth
      .setUserInfo(jwt, name, email)
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email, id: res._id, admin: res.admin })
      })
      .catch((err) => {
        setTooltipText(`Ошибка загрузки данных: ${err}`);
        setIsSuccessful(false);
        setIsInfoTooltipOpen(true);
      })
  }

  function uploadFile(formData) {
    const jwt = localStorage.getItem('jwt');
    axios.post('https://api.promo.nexus.moscow/users',
      formData,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        }
      }
    ).then(res => {
      console.log(res.data);
      getFile({
        status: res.data.status,
        name: res.data.name,
        path: 'https://api.promo.nexus.moscow' + res.data.path
      })
      setIsEditAvatarPopupOpen(false);
      setTooltipText('Аватар успешно изменен');
      setIsSuccessful(true);
      setIsInfoTooltipOpen(true);
    }).catch(err => {
      setIsEditAvatarPopupOpen(false);
      setTooltipText(`Ошибка загрузки данных: ${err.response.data.message}`);
      setIsSuccessful(false);
      setIsInfoTooltipOpen(true);
      setIsSearchError(true);
    })
      .finally(() =>
        setDataInfo());
  }

  function onSignOut() {
    setLoggedIn(false);
    navigate('/');
    localStorage.removeItem('jwt');
    localStorage.removeItem('savedFilteredMovies');
    localStorage.removeItem('savedInputSearch');
    localStorage.removeItem('savedShort');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('beatFilmMovies');
    localStorage.removeItem('beatFilmInputSearch');
    localStorage.removeItem('beatFilmFilteredMovies');
    localStorage.removeItem('beatFilmShort');
  }

  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
    setIsVideoPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsClose(false)
  }

  function handleOpenTrailerClick(movie) {
    setIsVideoPopupOpen(true)
    setIsClose(true)
    setMovie(movie);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleUpdateAvatar() {
    setIsLoading(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Routes>

          <Route path="/profile"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Profile}
                isMenuOpen={isMenuOpen}
                onClicOpen={handleMenuOpen}
                onUpdateProfile={handleUpdateProfile}
                onClick={onSignOut}
                onClickCloseMenu={handleMenuOpen}
                onEditAvatar={handleEditAvatarClick}
              />
            } />

          <Route path="/movies"
            element={
              <ProtectedRoute
                component={Movies}
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                onMovieSave={onMovieSave}
                isMenuOpen={isMenuOpen}
                onClicOpen={handleMenuOpen}
                onClicPopupOpen={handleOpenTrailerClick}
                onClickCloseMenu={handleMenuOpen}
              />
            } />

          <Route path="/saved-movies"
            element={
              <ProtectedRoute
                component={SavedMovies}
                loggedIn={loggedIn}
                movies={savedMovies}
                isMenuOpen={isMenuOpen}
                onClicOpen={handleMenuOpen}
                showPreloader={showPreloader}
                getMovies={getSavedMovies}
                isSearchError={isSearchError}
                onMovieDel={onMovieDel}
                onClicPopupOpen={handleOpenTrailerClick}
                onClickCloseMenu={handleMenuOpen}
              />
            } />

          <Route path="/admin"
            element={currentUser.admin === true ?
              <ProtectedRoute
                component={Admin}
                loggedIn={loggedIn}
                isMenuOpen={isMenuOpen}
                onClicOpen={handleMenuOpen}
                showPreloader={showPreloader}
                onClickCloseMenu={handleMenuOpen}
                users={users}
                onUserDel={onUserDel}
                onUpdateUserProfile={handleUpdateUserProfile}
                uploadFile={uploadFile}
                setDataUsers={setDataUsers}
                data={data}
                getFile={getFile}
              />
              : <Navigate to="/profile"
              />
            } />

          <Route path="/signup"
            element={!loggedIn
              ? <Register
                onRegister={onRegister}
                showPreloader={showPreloader} />
              : <Navigate to="/movies"
              />
            } />
          <Route path="/signin"
            element={!loggedIn
              ? <Login onLogin={onLogin}
                showPreloader={showPreloader} />
              : <Navigate to="/movies"
              />
            } />
          <Route path="/"
            element={
              <Main
                loggedIn={loggedIn}
                isMenuOpen={isMenuOpen}
                onClicOpen={handleMenuOpen}
                onClickCloseMenu={handleMenuOpen}
              />
            } />
          <Route path="*"
            element={
              <NotFound />
            } />
        </Routes>
        <InfoTooltip
          name='info-tooltip'
          isSuccess={isSuccessful}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          tooltipText={tooltipText}
        />
        <VideoPopup
          name='video'
          isOpen={isVideoPopupOpen}
          onClose={closeAllPopups}
          movie={movie}
          isClose={isClose}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          uploadFile={uploadFile}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
          onClose={closeAllPopups}
          setDataUsers={setDataUsers}
        />
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
