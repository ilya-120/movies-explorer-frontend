import React, { useState } from 'react';
import './SearchForm.css'

function SearchForm({ onSubmitSearch, short, handleShort, handleChange, inputSearch }) {
  const [error, setError] = useState('');
  function noSubmit(evt) {
    evt.preventDefault();
    setError('Нужно ввести ключевое слово');
  }

  function resetError() {
    setError('');
  }

  return (
    <form
      className="form search-form"
      onSubmit={inputSearch.length > 0 ? onSubmitSearch : noSubmit}
      onChange={resetError}
      noValidate
    >
      <div className="search-form__container">
        <input
          className="search-form__input"
          type="search"
          name="searchFilm"
          placeholder="Фильм"
          minLength="2"
          maxLength="50"
          required
          onChange={handleChange}
          value={inputSearch} />
        <button
          className="search-form__button"
          type="submit"
          name="submit-search">Найти</button>
      </div>
      <span id="searchFilm-error" className="login__error">{error}</span>
      <div className="search-form__filter">
        <label className="search-form__filter-checkbox">
          <input type="checkbox"
            checked={short}
            onChange={handleShort}
          />
          <span className="search-form__checkbox-slider" />
        </label>
        <p className="search-form__filter-label">Короткометражки</p>
      </div>
    </form>
  )
}

export default SearchForm;
