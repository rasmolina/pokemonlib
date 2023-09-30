// Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <img
        src={process.env.PUBLIC_URL + '/pokemon-header.jpg.webp'}
        alt="Imagem do cabeçalho"
        className="header-image"
      />
    </header>
  );
};

export default Header;
