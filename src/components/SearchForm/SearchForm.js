import React from 'react';
import './SearchForm.css'

function SearchForm() {
  function handleSubmit(evt) {
    evt.preventDefault();
  }
  return (
    <form
      className="search-form"
      onSubmit={handleSubmit}
    >
      <div className="search-form__container">
        <input
          className="search-form__input"
          type="search"
          name="search-film"
          placeholder="Фильм"
          required />
        <button
          className="search-form__button"
          type="submit"
          name="submit-search">Найти</button>
      </div>
      <div className="search-form__filter">
        <label className="search-form__filter-checkbox">
          <input type="checkbox" />
          <span className="search-form__checkbox-slider" />
        </label>
        <p className="search-form__filter-label">Короткометражки</p>
      </div>
    </form>
  )
}

export default SearchForm;
