import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <span className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</span>
      <div className='footer__info'>
        <span className='footer__copyright'>&copy; {new Date().getFullYear()}</span>
        <div className='footer__links'>
          <a className='footer__link' href='https://practicum.yandex.ru/' target='_blank' rel="noreferrer">Яндекс.Практикум</a>
          <a className='footer__link' href='https://github.com/ilya-120' target='_blank' rel="noreferrer">Github</a>
          <a className='footer__link' href='https://t.me/ilya_120' target='_blank' rel="noreferrer">Telegram</a>
        </div>
      </div>

    </footer>
  )
};

export default Footer;