import React from 'react';
import './Profile.css'
import '../Login/Login.css';
import { Link } from 'react-router-dom';
import UseForm from '../UseForm';
import FileUpload from '../FileUpload/FileUpload';

function EditProfile({
  onUpdateUserProfile,
  user,
  onClick,
  setEditForm,
  uploadFile,
  setDataUsers,
  data
}) {
  const { enteredValues, errors, isFormValid, handleChange } = UseForm();
  const isNotChange = Boolean(user.email === enteredValues.email && user.name === enteredValues.name);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!isFormValid) {
      return;
    }
    if (!enteredValues.name) {
      enteredValues.name = user.name;
    }
    if (!enteredValues.email) {
      enteredValues.email = user.email;
    }
    onUpdateUserProfile(enteredValues.name, enteredValues.email, user);
    setEditForm(false);
  }
  return (
    <>
      <section className="profile-edit">
        <form className="form profile-edit__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <h2 className="profile__title profile__title_edit-form">Редактирование данных пользователя: {user.name}!</h2>
          <div className="profile-edit__avatar">
            {data.status ? <img className="elements__user-avatar_img" crossOrigin="true" src={data.path} alt={data.name} />
              : <img className="elements__user-avatar_img" crossOrigin="true" src={user.avatar} alt="аватар пользователя"></img>}
          </div>
          <FileUpload
            user={user}
            uploadFile={uploadFile}
            setDataUsers={setDataUsers} />
          <div className="profile__input-container profile__input-container_edit-form">
            <label className="profile__label">Имя</label>
            <input
              className="input login__input"
              aria-label="Имя"
              type="Text"
              name="name"
              id="profileName"
              required
              pattern="[A-Za-zА-Яа-яЁё\s-]{2,30}"
              onChange={handleChange}
              defaultValue={user.name}
            />
          </div>
          <span id="name-error" className="login__error">{errors.name ? 'поле Имя от 2 до 30 символов, содержит только латиницу, кириллицу, пробел или дефис.' : ''}</span>
          <div className="profile__input-container profile__input-container_edit-form">
            <label className="profile__label">E-mail</label>
            <input
              className="input login__input"
              aria-label="Ваша почта"
              type="Email"
              name="email"
              id="profileEmail"
              required
              onChange={handleChange}
              defaultValue={user.email}
            />
          </div>
          <span id="email-error" className="login__error">{errors.email}</span>
          <button
            type="submit"
            className={`login__button login__button_edit-form ${(isFormValid && !isNotChange) ? '' : 'login__button_profile_disabled'}`}
            disabled={!isFormValid || isNotChange}
          >Редактировать</button>
          <Link to="/admin" className="login__link login__link_edit-form" onClick={onClick}>Назад</Link>
        </form>
      </section>
    </>
  )
}

export default EditProfile
