import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__projects'>
        <li className="portfolio__link-item">
          <a className='portfolio__link' rel='noreferrer' href='https://github.com/ilya-120/how-to-learn' target='_blank'>
          <span className='portfolio__text-link'>Статичный сайт</span>
          <span className='portfolio__arrow-link'>↗</span>
          </a>
        </li>
        <li className="portfolio__link-item">
          <a className='portfolio__link' rel='noreferrer' href='https://github.com/ilya-120/russian-travel' target='_blank'>
          <span className='portfolio__text-link'>Адаптивный сайт</span>
          <span className='portfolio__arrow-link'>↗</span>
          </a>
        </li>
        <li className="portfolio__link-item">
          <a className='portfolio__link' rel='noreferrer' href='https://github.com/ilya-120/react-mesto-api-full' target='_blank'>
            <span className='portfolio__text-link'>Одностраничное приложение</span>
            <span className='portfolio__arrow-link'>↗</span>
          </a>
        </li>
      </ul>
    </section>
  )
};

export default Portfolio;