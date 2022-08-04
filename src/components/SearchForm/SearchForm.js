import React from 'react';
import './SearchForm.css'
import UseForm from '../UseForm';

function SearchForm() {
  const { enteredValues, errors, isFormValid, handleChange } = UseForm({});
  function handleSubmit(evt) {
    evt.preventDefault();
    if (!enteredValues.searchFilm || !isFormValid) {
      console.log("Нужно ввести ключевое слово");
      return;
    }
  }
  return (
    <form
      className="form search-form"
      onSubmit={handleSubmit}
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
          value={enteredValues.searchFilm || ''} />
        <button
          className="search-form__button"
          type="submit"
          name="submit-search">Найти</button>
      </div>
      <span id="searchFilm-error" className="login__error">{errors.searchFilm}</span>
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
