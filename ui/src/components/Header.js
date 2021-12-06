import React from 'react'; 
import Logo from '../images/hooli-bank-logo.svg';

export const Header = () => {
    return (
        <div className="logo">
            <img alt="Hooli logo" src={Logo} />
        </div>
    )
}
