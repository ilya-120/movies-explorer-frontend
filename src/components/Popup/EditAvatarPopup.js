import React, { useContext } from 'react';
import FileUpload from '../FileUpload/FileUpload.js';
import Popup from './Popup.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function EditAvatarPopup({ isOpen, onClose, uploadFile, setDataUsers }) {
  const currentUser = useContext(CurrentUserContext);
  const user = { _id: `${currentUser.id}` };

  return (
    <Popup
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}>
      <h2 className="popup__container-title">Обновить аватар</h2>
      <FileUpload
        user={user}
        uploadFile={uploadFile}
        setDataUsers={setDataUsers} />
    </Popup>
  );
}

export default EditAvatarPopup;
