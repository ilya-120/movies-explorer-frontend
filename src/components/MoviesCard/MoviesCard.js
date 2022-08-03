import React from 'react';
import './MoviesCard.css'
import { useLocation } from "react-router-dom";

function MoviesCard({ movie }) {
  const duration = `${Math.trunc(movie.duration / 60)}ч ${movie.duration % 60}м`;
  const path = useLocation();

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
            />
            <span className="movies-card__favorite-btn" />
          </label>)
        }

        {path.pathname === "/saved-movies" &&
          (<div className="movies-card__del">
            <button
              aria-label="Удалить из избранного"
              type="button"
              className="movies-card__del-btn"
              id={movie.id}
            />
          </div>)
        }
      </div>
      <img className="movies-card__image"
        src={`https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`}
        alt={movie.nameRU} />
    </article>
  )
}

export default MoviesCard;
