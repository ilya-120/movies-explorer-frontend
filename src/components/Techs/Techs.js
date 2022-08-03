import React from 'react';
import './Techs.css';

const Techs = () => {
  return (
    <section className='techs'>
      <h2 className='blok__title'>Технологии</h2>
      <div className="blok__title-line" />
      <h3 className="techs__description-title">7 технологий</h3>
      <p className="techs__description-subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__list">
        <li className="techs__item">HTML</li>
        <li className="techs__item">CSS</li>
        <li className="techs__item">JS</li>
        <li className="techs__item">React</li>
        <li className="techs__item">Git</li>
        <li className="techs__item">Express.js</li>
        <li className="techs__item">mongoDB</li>
      </ul>
    </section>
  )
}

export default Techs
