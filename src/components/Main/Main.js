import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';

function Main({ loggedIn }) {
    return (
        <>
            <Header loggedIn={loggedIn} />
            <Promo />
            <AboutProject />
            <Techs />
        </>
    )
}

export default Main