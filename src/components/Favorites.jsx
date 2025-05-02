// Favourites.jsx
import React from "react";
import { useFavorites } from "../context/FavoriteContext";
import Card from "./Card";
import { Link } from "react-router-dom";
import styles from "./PokeList.module.css";

const Favourites = () => {
  const { favorites } = useFavorites(); 

  if (favorites.length === 0) {
    return <p>No favourites yet.</p>;
  }

  return (
    <div className={styles["pokelist-container"]}>
      {favorites.map((pokemon) => (
        <Link key={pokemon.name} to={`/pokedetails/${pokemon.id}`}>
          <Card data={pokemon} />
        </Link>
      ))}
    </div>
  );
};

export default Favourites;
