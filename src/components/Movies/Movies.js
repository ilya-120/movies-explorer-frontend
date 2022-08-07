import React, { useState, useEffect } from 'react';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import { moviesApi } from '../../utils/MoviesApi';
import { UseFilterMovies } from '../UseFilterMovies.js';


function Movies({ loggedIn,
  savedMovies,
  onMovieSave,
  isMenuOpen,
  onClicOpen,
  onClicPopupOpen,
  onClickCloseMenu }) {
  const [beatFilmMovies, setBeatFilmMovies] = useState([]);
  const [showPreloader, setShowPreloader] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);

  const {
    short,
    filteredMovies,
    inputSearch,
    handleSwitchShort,
    handleInputChange,
    onSubmitSearch,
    filterMovies,
  } = UseFilterMovies(beatFilmMovies, 'beatFilm', false, getMoviesBeatfilm);

  function getMoviesBeatfilm() {
    if (localStorage.getItem('beatFilmMovies')) {
      setBeatFilmMovies(JSON.parse(localStorage.getItem('beatFilmMovies')));
      filterMovies(JSON.parse(localStorage.getItem('beatFilmMovies')), inputSearch, short)
    } else {
      setShowPreloader(true);
      moviesApi
        .getMovies()
        .then(data => {
          setBeatFilmMovies(data);
          localStorage.setItem('beatFilmMovies', JSON.stringify(data));
          filterMovies(data, inputSearch, short);
          setIsSearchError(false);
        }
        ).catch(err => {
          setIsSearchError(true);
          console.log(err)
        })
        .finally(() => setShowPreloader(false));
    }
  }

  useEffect(() => {
    setIsSearchError(false);
    if (localStorage.getItem('beatFilmMovies')) {
      setBeatFilmMovies((JSON.parse(localStorage.getItem('beatFilmMovies'))));
    }
  }, [])

  return (
    <>
      <div className={`${isMenuOpen && 'background-overlay_activ'}`}
        onClick={onClickCloseMenu}></div>
      <Header
        loggedIn={loggedIn}
        isMenuOpen={isMenuOpen}
        onClicOpen={onClicOpen} />
      <SearchForm
        onSubmitSearch={onSubmitSearch}
        short={short}
        handleChange={handleInputChange}
        handleShort={handleSwitchShort}
        inputSearch={inputSearch}
      />
      <MoviesCardList
        short={short}
        movies={filteredMovies}
        savedMovies={savedMovies}
        onMovieSave={onMovieSave}
        showPreloader={showPreloader}
        isSearchError={isSearchError}
        onClicPopupOpen={onClicPopupOpen}
      />
      <Footer />
    </>
  )
}

export default Movies
