import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PokeDetails.module.css";

const PokeDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [evolution, setEvolution] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setDetails(data);

      const speciesRes = await fetch(data.species.url);
      const speciesData = await speciesRes.json();
      const evoRes = await fetch(speciesData.evolution_chain.url);
      const evoData = await evoRes.json();
      setEvolution(evoData);
    };

    fetchDetails();
  }, [id]);

  if (!details) return <p>Loading...</p>;

  const getEvolutionNames = (chain) => {
    const names = [];
    let current = chain;
    while (current) {
      names.push(current.species.name);
      current = current.evolves_to[0];
    }
    return names.join(" → ");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{details.name.toUpperCase()}</h2>
      <img className={styles.image} src={details.sprites.front_default} alt={details.name} />
      <div className={styles.info}>
        <p><b>Stats:</b> {details.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(", ")}</p>
        <p><b>Abilities:</b> {details.abilities.map(a => a.ability.name).join(", ")}</p>
        <p><b>Moves:</b> {details.moves.map(m => m.move.name).slice(0, 10).join(", ")}</p>
        <p><b>Evolution:</b> {evolution ? getEvolutionNames(evolution.chain) : "Loading..."}</p>
      </div>
    </div>
  );
};

export default PokeDetails;
