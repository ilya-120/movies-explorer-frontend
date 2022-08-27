import React, { useRef, useState } from 'react';
import './FileUpload.css'


function FileUpload({ user, uploadFile }) {

  const [file, setFile] = useState('');
  const el = useRef();
  const userId = user._id;
  const formData = new FormData();

  formData.append('userId', userId);
  formData.append('file', file);

  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    console.log(user._id);
    setFile(file);
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
