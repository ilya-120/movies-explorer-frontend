import React from 'react';
import './Slaider.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Slaider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };
  return (
    <section className='slider'>
      <h2 className='slider__background-text'>Портфолио моих проектов</h2>
      <form className='slider__form'>
        <p className='slider__subtitle'>По вопросам сотрудничества</p>
        <button className='slider__button'>
          <a className='slider__link' href='https://t.me/ilya_120' target='_blank' rel="noopener noreferrer">Связаться</a>
        </button>
      </form>
      <Slider className='slider__background-overlay' {...settings}>
        <img className="slider__img" src="https://kvotka.ru/images/2022/08/16/SNIMOK-EKRANA-2022-08-16-V-12.42.51.png" alt="1"></img>
        <img className="slider__img" src="https://kvotka.ru/images/2022/08/16/SNIMOK-EKRANA-2022-08-16-V-12.42.05.png" alt="2"></img>
        <img className="slider__img" src="https://kvotka.ru/images/2022/08/16/SNIMOK-EKRANA-2022-08-16-V-12.41.13.png" alt="N"></img>
      </Slider>
    </section>
  )
};

export default Slaider;
