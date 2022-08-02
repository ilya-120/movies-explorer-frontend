import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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

function App() {

  const [isMenuOpen, setMenuOpen] = useState(false);

  function handleMenuOpen() {
    setMenuOpen(!isMenuOpen);
  }

  return (
    <div className="root">
      <Routes>
        <>
          <Route path="/signup"
            element={
              <Register
                userName={'Виталий'}
                email={'pochta@yandex.ru'} />
            } />
          <Route path="/signin"
            element={
              <Login
                email={'pochta@yandex.ru'} />
            } />
          <Route path="/profile"
            element={
              <Profile
                loggedIn={true}
                userName={'Виталий'}
                email={'pochta@yandex.ru'}
                isMenuOpen={isMenuOpen}
                onClicOpen={handleMenuOpen}
              />
            } />
          <Route path="/movies"
            element={
              <Movies
                loggedIn={true}
                movies={movies}
                isMenuOpen={isMenuOpen}
                onClicOpen={handleMenuOpen}
              />
            } />
          <Route path="/saved-movies"
            element={
              <SavedMovies loggedIn={true}
                movies={favoriteMovies}
                isMenuOpen={isMenuOpen}
                onClicOpen={handleMenuOpen}
              />
            } />
          <Route path="/"
            element={
              <Main />
            } />
          <Route path="*"
            element={
              <NotFound />
            } />
        </>
      </Routes>
    </div>
  );
}

export default App;
