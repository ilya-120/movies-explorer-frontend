import React from 'react';
import './MoviesCard.css'
import { useLocation } from "react-router-dom";

function MoviesCard({ movie, savedMovies, onMovieSave, onMovieDel, onClicPopupOpen }) {
  const duration = `${Math.trunc(movie.duration / 60)}ч ${movie.duration % 60}м`;
  const path = useLocation();
  const isSaved = savedMovies?.some(i => i.movieId === movie.id)

  function handleSaveClick() {
    onMovieSave(movie);
  }

  function handleDelClick() {
    onMovieDel(movie);
  }

  function handlePopupOpen() {
    onClicPopupOpen(movie)
  }

  return (
    <article className="movies-card">
      <div className="movies-card__title-container">
        <div className="movies-card__text">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <span className="movies-card__duration">{duration}</span>
        </div>

        {path.pathname === "/movies" &&
          (<label className="movies-card__favorite-container">
            <input
              aria-label="Добавить в избранное"
              type="checkbox"
              className="movies-card__favorite-btn-hide"
              id={movie.id}
              onChange={handleSaveClick}
            />
            <span className={`movies-card__favorite-btn ${isSaved && 'movies-card__favorite-btn_is_saved'}`}/>
          </label>)
        }

        {path.pathname === "/saved-movies" &&
          (<div className="movies-card__del">
            <button
              aria-label="Удалить из избранного"
              type="button"
              className="movies-card__del-btn"
              id={movie.id}
              onClick={handleDelClick}
            />
          </div>)
        }
      </div>
      <img className="movies-card__image"
        src={path.pathname === '/movies' ?
          `https://api.nomoreparties.co${movie.image.url}`
          : movie.image}
        alt={movie.nameRU}
        onClick={handlePopupOpen} />
    </article>
  )
}

export default MoviesCard;
