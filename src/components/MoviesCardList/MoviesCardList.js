import React, { useState, useEffect } from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard.js';
import { useLocation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader.js';
import { useScreenWidthBinding } from '../useScreenWidthBinding';

function MoviesCardList({ movies,
  savedMovies,
  onMovieSave,
  onMovieDel,
  showPreloader,
  isSearchError,
  onClicPopupOpen,
  inputSearch }) {
  const path = useLocation();
  const {
    displayedMovies,
    displayMoreMovies,
  } = useScreenWidthBinding(movies)

  return (
    <>
      <Preloader showPreloader={showPreloader} />
      <p className={`movies-card-list__text ${isSearchError && 'movies-card-list__text_visible'}`}
      >Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и
        попробуйте ещё раз</p>
      <p
        className={`movies-card-list__text ${((path.pathname === '/movies' && displayedMovies?.length === 0 && localStorage.getItem('beatFilmMovies'))
          || (path.pathname === '/saved-movies' && movies?.length === 0))
          && 'movies-card-list__text_visible'}`}>Ничего не найдено</p>
      <section className="movies-card-list" aria-label="Фильмы">
        {path.pathname === '/movies' &&
          displayedMovies
            .map((movie) =>
              <MoviesCard
                key={movie.id || movie._id}
                movie={movie}
                savedMovies={savedMovies}
                onMovieSave={onMovieSave}
                onMovieDel={onMovieDel}
                onClicPopupOpen={onClicPopupOpen}
              />)}
        {path.pathname === '/saved-movies' &&
          movies
            .map((movie) =>
              <MoviesCard
                key={movie.id || movie._id}
                movie={movie}
                onMovieSave={onMovieSave}
                onMovieDel={onMovieDel}
                onClicPopupOpen={onClicPopupOpen}
              />)}
      </section>
      <section className="movies-card-list__more">
        {Boolean(path.pathname === '/movies' & (movies.length > displayedMovies.length)) &&
          <button
            className="movies-card-list__more-btn"
            onClick={displayMoreMovies}
          >Ещё</button>
        }
      </section>
    </>
  )
}

export default MoviesCardList
