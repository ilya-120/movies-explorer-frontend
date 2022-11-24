import React, { useRef, useState, useContext } from 'react';
import './FileUpload.css'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function FileUpload({ user, uploadFile, setDataUsers }) {
  const currentUser = useContext(CurrentUserContext);
  const [file, setFile] = useState('');
  const el = useRef();
  const userId = user._id;
  const formData = new FormData();

  formData.append('userId', userId);
  formData.append('file', file);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (currentUser.admin) {
      setDataUsers()
    }
  }

  function handleEditClick() {
    uploadFile(formData);
  }

  return (
    <div>
      <div className="file-upload">
        <input className="file-upload__input" type="file" ref={el} onChange={handleChange} />
        <button onClick={handleEditClick} className="upbutton">
          Загрузить
        </button>
      </div>
    </div>
  );
}

export default FileUpload;
