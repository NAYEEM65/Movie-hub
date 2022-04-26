import React from 'react';
import './Header.css';
import { ReactComponent as Mainlogo } from '../../assets/main-logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <Link to="/">
                <Mainlogo />
            </Link>
        </div>
    );
};

export default Header;
