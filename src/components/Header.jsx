import React from 'react';
import Search from './Search';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = ({ onSearchChange, onSearchClick }) => {
  const navigate = useNavigate();

  return (
    <header>
      <div className={styles['header-container']}>
        <h1 className={styles['app-logo']} onClick={() => navigate('/')}>pokeApp</h1>
        <h1 className={styles['favorites']} onClick={() => navigate('/favourites')}>
          Favorites
        </h1>
        <Search onInputChange={onSearchChange} onSearchClick={onSearchClick} />
      </div>
    </header>
  );
};

export default Header;
