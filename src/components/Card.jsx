import React, { useEffect, useState, useContext } from "react";
import Tags from "./Tags";
import styles from "./Card.module.css";
import { FavoritesContext } from "../context/FavoriteContext";

const Card = ({ data }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [types, setTypes] = useState([]);

  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const isFav = favorites.some((p) => p.name === data.name);

  useEffect(() => {
    const fetchPokeDetail = async () => {
      try {
        const response = await fetch(data.url);
        const pokeData = await response.json();
        setImageUrl(pokeData.sprites.front_default);
        setTypes(pokeData.types.map((t) => t.type.name));
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokeDetail();
  }, [data.url]);

  const handleFavClick = (e) => {
    e.preventDefault(); // Prevent navigating if inside a <Link>
    toggleFavorite({ ...data, image: imageUrl, types });
  };

  return (
    <div className={styles["poke-card"]}>
      <h2 className={styles["card-title"]}>{data.name}</h2>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={data.name}
          style={{ height: "150px", width: "150px" }}
        />
      )}
      <div className={styles["tags-container"]}>
        <h4>Types:</h4>
        {types.map((type, index) => (
          <Tags key={index} type={type} />
        ))}
      </div>
      <button
        className={`${styles["add-remove"]} ${isFav ? styles["remove"] : styles["add"]}`}
        onClick={handleFavClick}
      >
        {isFav ? "Remove from Favourites" : "Add to Favourites"}
      </button>
    </div>
  );
};

export default Card;
