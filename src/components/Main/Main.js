import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject'

function Main({ loggedIn }) {
    return (
        <>
            <Header loggedIn={loggedIn} />
            <Promo />
            <AboutProject />
        </>
    )
}

export default Main