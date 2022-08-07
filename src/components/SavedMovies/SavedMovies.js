import React, { useEffect } from 'react';
import Header from '../Header/Header.js';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import { UseFilterMovies } from '../UseFilterMovies.js';

function SavedMovies({ loggedIn,
  movies,
  isMenuOpen,
  onClicOpen,
  onMovieDel,
  showPreloader,
  getMovies,
  isSearchError,
  onClicPopupOpen,
  onClickCloseMenu }) {
  const {
    short,
    setShort,
    filteredMovies,
    updateFilteredMovies,
    inputSearch,
    setInputSearch,
    handleSwitchShort,
    handleInputChange,
    onSubmitSearch
  } = UseFilterMovies(movies, 'saved', true);

  useEffect(() => {
    getMovies();
  }, [])

  useEffect(() => {
    updateFilteredMovies(movies);
    setShort(false);
    setInputSearch('');
  }, [movies]);
  return (
    <>
      <div className={`${isMenuOpen && 'background-overlay_activ'}`}
        onClick={onClickCloseMenu}></div>
      <Header
        loggedIn={loggedIn}
        isMenuOpen={isMenuOpen}
        onClicOpen={onClicOpen}
      />
      <SearchForm
        onSubmitSearch={onSubmitSearch}
        short={short}
        handleChange={handleInputChange}
        handleShort={handleSwitchShort}
        inputSearch={inputSearch}
      />
      <MoviesCardList
        movies={filteredMovies}
        short={short}
        onMovieDel={onMovieDel}
        showPreloader={showPreloader}
        isSearchError={isSearchError}
        onClicPopupOpen={onClicPopupOpen}
      />
      <Footer />
    </>
  )
}

export default SavedMovies
