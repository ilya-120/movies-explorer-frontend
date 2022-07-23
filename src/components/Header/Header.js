import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ loggedIn }) {
    return (
        <header className={`header ${loggedIn && 'header_isloggedIn'}`}>
            <Link to="/">
                <img
                    src={logo}
                    alt="Логотип"
                    className={`header__logo ${loggedIn && 'header__logo_isloggedIn'}`}
                />
            </Link>
            <Navigation />
        </header>
    )
}

export default Header