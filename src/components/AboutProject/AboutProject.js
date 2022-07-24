import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about">
      <h2 className="blok__title">О проекте</h2>
      <div className="blok__title-line" />
      <div className="about__info">
        <h3 className="about__info-title" id="title-1">Дипломный проект включал 5 этапов</h3>
        <h3 className="about__info-title" id="title-2">На выполнение диплома ушло 5 недель</h3>
        <p className="about__info-text" id="text-1">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <p className="about__info-text" id="text-2">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="about__times">
        <div className="about__times-backend">1 неделя</div>
        <div className="about__times-frontend">4 недели</div>
        <p className="about__times-description">Back-end</p>
        <p className="about__times-description">Front-end</p>
      </div>
    </section>
  )
};

export default AboutProject;
