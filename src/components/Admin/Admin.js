import React, { useState, useEffect } from 'react';
import Header from '../Header/Header.js';
import EditProfile from '../Profile/EditProfile.js';
import User from './User.js';

function Admin({ loggedIn,
  isMenuOpen,
  onClicOpen,
  onClickCloseMenu,
  users,
  onUserDel,
  onUpdateUserProfile,
  uploadFile,
  setDataUsers,
  data,
  getFile
}) {
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [editUser, setEditUser] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [newUsers, setNewUsers] = useState(users);
  const [showUsers, setShowUsers] = useState(5);
  const [editForm, setEditForm] = useState(false);
  const handleChange = (evt) => {
    setInput(String(evt.target.value));
  }

  useEffect(() => {
    if (users) {
      setNewUsers(users);
      setSearchValue('');
      setShowUsers(5);
    }
  }, [users])

  function displayMoreUsers() {
    if (users.length > showUsers) {
      setShowUsers(showUsers + 5);
    };
  };

  const displayedUsers = newUsers.length > 0 ? newUsers.slice(0, showUsers) : [];

  function noSubmit(evt) {
    evt.preventDefault();
    setSearchValue('');
    setError('Нужно ввести ключевое слово');
  }

  function onSubmit(evt) {
    evt.preventDefault();
    onSearch(input);
    setSearchValue(input);
    setInput('');
  }

  function onSearch(input) {
    setNewUsers(users.filter(({ name }) => (name.toLowerCase().includes(input))));
  }

  function resetError() {
    setError('');
  }

  function handleClick() {
    setEditForm(false);
    setError('');
    getFile({ status: false, name: "", path: "" });
  }

  return (
    <>
      <div className={`${isMenuOpen && 'background-overlay_activ'}`}
        onClick={onClickCloseMenu}></div>
      <Header
        loggedIn={loggedIn}
        isMenuOpen={isMenuOpen}
        onClicOpen={onClicOpen}
      />
      <section className="profile-operations">
        <p className="profile-operations__subtitle">Создать пользователя</p>
        <button
          aria-label="Добавить пользователя"
          className="profile-operations__button"
          type="button">
        </button>
      </section>
      <section className="profile-operations">
        <p className="profile-operations__subtitle">Найти пользователя</p>
        <form
          className="form profile-operations-search-form"
          onSubmit={input.length > 0 ? onSubmit : noSubmit}
          onChange={resetError}
          noValidate
        >
          <div className="profile-operations-search-form__container">
            <input
              className="profile-operations-search-form__input"
              type="search"
              name="searchUser"
              placeholder="Имя"
              required
              onChange={handleChange}
              value={input}
            />
            <button
              aria-label="Найти пользователя"
              className="profile-operations__button profile-operations__button_search"
              type="submit"
            >
            </button>
          </div>
          <span id="searchFilm-error" className="login__error">{error}</span>
        </form>
        {(searchValue) && <p className="profile-operations__subtitle profile-operations__subtitle_activ">Результаты поиска: {searchValue}</p>}
      </section>
      {!editForm ?
        <section className="elements">
          {displayedUsers.map((user) => (
            <User
              onUserDel={onUserDel}
              key={user._id}
              user={user}
              displayMoreUsers={displayMoreUsers}
              setEditForm={setEditForm}
              setEditUser={setEditUser}
            />
          )
          )}
        </section> :
        <EditProfile
          loggedIn={loggedIn}
          user={editUser}
          onUpdateUserProfile={onUpdateUserProfile}
          onClick={handleClick}
          setEditForm={setEditForm}
          uploadFile={uploadFile}
          setDataUsers={setDataUsers}
          data={data}
        />}
      {!editForm ?
        (newUsers.length > displayedUsers.length) &&
        <button
          className="users-list__more-btn"
          onClick={displayMoreUsers}
        >Ещё</button> : <p></p>}
    </>
  )
}

export default Admin;
