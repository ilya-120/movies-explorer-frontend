import React from 'react';
import Popup from './Popup';

function VideoPopup({ name,
  isOpen,
  onClose,
  movie,
  isClose }) {
  const id = String(movie.trailerLink).replace('https://www.youtube.com/watch?v=', '');
  return (
    <Popup
      isOpen={isOpen}
      name={name}
      onClose={onClose}>
      <iframe id="ytplayer" type="text/html" width="720" height="405"
        src={isClose ? `https://www.youtube.com/embed/${id}` : ''}
        frameBorder="0" allowFullScreen
        className="popup__video">
      </iframe>
      <h3 className="popup__signup-title">{movie.nameRU}</h3>
    </Popup>
  );
};

export default VideoPopup;
