import React from 'react'
import './Preloader.css'

const Preloader = ({ showPreloader }) => {
  return (
    <div className={`preloader ${showPreloader && 'preloader_visible'}`}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
};

export default Preloader
