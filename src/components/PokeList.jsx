import Card from "./Card";
import styles from "./PokeList.module.css";

const PokeList = ({ pokemons, loading }) => {
  console.log(pokemons);

  if (loading) {
    return <p>Loading Pokémon...</p>;
  }

  return (
    <div className={styles["pokelist-container"]}>
      {pokemons.length ? (pokemons.map((pokemon, index) => (
        <div key={index}>
          <Card data={pokemon} />
        </div>
      ))):(<div><h1>NO MATCHING POKE's.</h1><p>Try again with proper name! 😊</p></div>)}
    </div>
  );
};

export default PokeList;
