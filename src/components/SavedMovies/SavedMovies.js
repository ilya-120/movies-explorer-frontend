import React from 'react';
import Header from '../Header/Header.js';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
// import Preloader      from '../Preloader/Preloader.js';

function SavedMovies({ loggedIn, movies, isMenuOpen, onClicOpen }) {
  return (
    <div>
      <Header
        loggedIn={loggedIn}
        isMenuOpen={isMenuOpen}
        onClicOpen={onClicOpen}
      />
      <SearchForm />
      <MoviesCardList movies={movies} />
      {/*<Preloader/>*/}
      <Footer />
    </div>
  )
}

export default SavedMovies
