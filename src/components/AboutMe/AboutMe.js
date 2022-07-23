import './AboutMe.css';
import photo from '../../images/avatar.jpg';

const AboutMe = () => {
    return (
        <section className='about-me'>
            <h2 className='blok__title'>Студент</h2>
            <div className="blok__title-line" />
            <div className='about-me__content'>
                <div className='about-me__info'>
                    <span className='about-me__name'>Илья</span>
                    <span className='about-me__job'>Фронтенд-разработчик, 35 лет</span>
                    <span className='about-me__bio'>
                        Я родился и живу в Москве, закончил факультет экономики СГЭУ. Работаю на постоянной работе руководителем финансового отдела в инфраструктурной компании. Веб-разработка и программирование мое хобби. Собираюсь запустить несколько стартапов в IT.                    </span>
                    <a className='about-me__link' href='https://github.com/ilya-120' target='_blank' rel='noreferrer'>Facebook</a>
                    <a className='about-me__link' href='https://github.com/ilya-120' target='_blank' rel='noreferrer'>Github</a>
                </div>
                <img
                    className='about-me__photo'
                    src={photo}
                    alt='Мое фото'
                />
            </div>
        </section>
    )
};

export default AboutMe;