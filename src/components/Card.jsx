import React, { useEffect, useState } from "react";
import Tags from "./Tags";
import styles from "./Card.module.css";

const Card = (props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchPokeDetail = async () => {
      try {
        const response = await fetch(props.data.url);
        const data = await response.json();
        setImageUrl(data.sprites.back_default);
        setTypes(data.types.map((item) => item.type.name));
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokeDetail();
  }, [props.data.url]);

  return (
    <div className={styles["poke-card"]}>
      <h2 className={styles["card-title"]}>{props.data.name}</h2>
      {imageUrl && (
        <img
          style={{ height: "150px", width: "150px" }}
          src={imageUrl}
          alt={props.data.name}
        />
      )}
      <div className={styles["tags-container"]}>
        <h4>Types:</h4>
        {types.map((type, index) => (
          <Tags key={index} type={type} />
        ))}
      </div>
    </div>
  );
};

export default Card;
