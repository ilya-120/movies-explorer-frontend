import { useState, useEffect } from 'react';

export function UseFilterMovies(movies, isSaved, initialStateRender, getFilm) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [short, setShort] = useState(false);

  useEffect(() => {
    updateFilteredMovies(JSON.parse(localStorage.getItem(`${isSaved}FilteredMovies`) || '[]'));
    updateInputSearch(localStorage.getItem(`${isSaved}InputSearch`) || '');
    updateShort(JSON.parse(localStorage.getItem(`${isSaved}Short`) || 'false'));
  }, []);

  function updateFilteredMovies(filteredMovies) {
    setFilteredMovies(filteredMovies);
    localStorage.setItem(`${isSaved}FilteredMovies`, JSON.stringify(filteredMovies));
  }

  function updateInputSearch(inputSearch) {
    setInputSearch(inputSearch);
    localStorage.setItem(`${isSaved}InputSearch`, inputSearch);
  }

  function updateShort(short) {
    setShort(short);
    localStorage.setItem(`${isSaved}Short`, JSON.stringify(short));
  }

  function handleInputChange(evt) {
    const value = evt.target.value.toLowerCase();
    updateInputSearch(value);
  }

  function filterMovies(movies, input, shortCheck) {
    if (input.length === 0 && !initialStateRender) {
      !initialStateRender && updateFilteredMovies([]);
    } else {
      updateFilteredMovies(movies
        .filter(({
          nameRU,
          nameEN,
          duration,
        }) => (nameRU.toLowerCase().includes(input) || nameEN?.toLowerCase().includes(input))
          & (!shortCheck || duration <= 40)))
    }
  }

  function handleSwitchShort(evt) {
    const inputShortCheckBox = evt.target.checked;
    updateShort(inputShortCheckBox);
    filterMovies(movies, inputSearch, inputShortCheckBox);
  }

  function onSubmitSearch(evt) {
    evt.preventDefault();
    if (!initialStateRender) {
      getFilm();
    } else {
      filterMovies(movies, inputSearch, short);
    }

  }

  return {
    short,
    filteredMovies,
    setFilteredMovies,
    inputSearch,
    setInputSearch,
    setShort,
    handleSwitchShort,
    handleInputChange,
    onSubmitSearch,
    updateFilteredMovies,
    filterMovies,
  }
}
