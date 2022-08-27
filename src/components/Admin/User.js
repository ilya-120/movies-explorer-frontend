import React from 'react';
import './User.css';

function User({ user, onUserDel, displayMoreUsers, setEditForm, setEditUser }) {

  function handleDelClick() {
    onUserDel(user);
    displayMoreUsers();
  }

  function handleEditClick() {
    setEditForm(true);
    setEditUser(user);
  }

  return (
    <article className="elements__users">
      <img className="elements__user-avatar" crossOrigin="true" src={user.avatar} alt="аватар пользователя"></img>
      <ul className="elements__user">
        <li className="elements__user-title">имя: {user.name}</li>
        <li className="elements__user-title">email: {user.email}</li>
        <li className="elements__user-title">администратор: {user.admin === true ? 'да' : 'нет'}</li>
      </ul>
      <div className="user__btn-container">
        <button
          aria-label="Удалить пользователя"
          type="button"
          className="user__del-btn"
          id={user.id}
          onClick={handleDelClick}
        />
      </div>
      <div className="user__btn-container">
        <button
          aria-label="Редактировать данные пользователя"
          type="button"
          className="profile__edit-button"
          id={user.id}
          user={user}
          onClick={handleEditClick}
        />
      </div>
    </article>
  );
}

export default User;
