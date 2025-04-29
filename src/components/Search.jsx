import React from 'react'
import styles from './Search.module.css'

const Search = ({ onInputChange, onSearchClick }) => {

  const handleChange = (e) => {
    onInputChange(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchClick();
  };

  return (
    <form className={styles['search-container']} onSubmit={handleSearch}>
      <input type="text" onChange={handleChange} placeholder='Type here to search for your Pokémon'/>
      <button>Search</button>
    </form>
  )
}

export default Search;
