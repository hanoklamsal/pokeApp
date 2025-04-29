import React from 'react'
import Search from './Search'
import styles from './Header.module.css'

const Header = ({ onSearchChange, onSearchClick }) => {
  return (
    <header>
      <div className={styles['header-container']}>
        <h1>pokeApp</h1>
        <Search onInputChange={onSearchChange} onSearchClick={onSearchClick} />
      </div>
    </header>
  );
}

export default Header;
