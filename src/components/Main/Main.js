import Header from '../Header/Header';
import Promo from '../Promo/Promo';

function Main({ loggedIn }) {
    return (
        <>
            <Header loggedIn={loggedIn} />
            <Promo />
        </>
    )
}

export default Main