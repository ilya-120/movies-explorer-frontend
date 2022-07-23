import './AboutProject.css';

function AboutProject() {
    return (
      <div className="about">
        <h2 className="about__title">О проекте</h2>
        <div className="about__title-line"/>
        <div className="about__info">
          <h3 className="about__info-title">Дипломный проект включал 5 этапов</h3>
          <h3 className="about__info-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about__info-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          <p className="about__info-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
        <div className="about__times">
          <div className="about__times-backend">1 неделя</div>
          <div className="about__times-frontend">4 недели</div>
          <p className="about__times-description">Back-end</p>
          <p className="about__times-description">Front-end</p>
        </div>
      </div>
    )
  };

export default AboutProject;