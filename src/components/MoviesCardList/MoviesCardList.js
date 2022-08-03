import React from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard.js';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ movies }) {
  const path = useLocation();

  return (
    <>
      <section className="movies-card-list" aria-label="Фильмы">
        {movies.map((movie) =>
          <MoviesCard
            key={movie.id}
            movie={movie} />)}
      </section>
      <section className="movies-card-list__more">
        {path.pathname === '/movies' &&
          <button className="movies-card-list__more-btn">Ещё</button>
        }
      </section>
    </>
  )
}

export default MoviesCardList
