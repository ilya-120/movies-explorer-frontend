import { Link } from 'react-router-dom';
import './Navigation.css'

function Navigation() {
    return (
        <nav className="navigation">
            <>
                <Link to="/signup" className="header__link">Регистрация</Link>
                <Link to="/signin" className="header__button">
                    <p className="header__button-text">Войти</p>
                </Link>
            </>
        </nav>
    )
}

export default Navigation