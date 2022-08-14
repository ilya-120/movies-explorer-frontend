import React from 'react';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main({ loggedIn,
  isMenuOpen,
  onClicOpen,
  onClickCloseMenu }) {
  return (
    <main>
      <div className={`${isMenuOpen && 'background-overlay_activ'}`}
        onClick={onClickCloseMenu}></div>
      <Header
        loggedIn={loggedIn}
        isMenuOpen={isMenuOpen}
        onClicOpen={onClicOpen}
      />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </main>
  )
}

export default Main
