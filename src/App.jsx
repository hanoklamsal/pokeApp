import "./App.css";
import Header from "./components/Header";
import PokeList from "./components/PokeList";
import { useState, useEffect } from "react";

function App() {
  const [searchText, setSearchText] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await response.json();
        setPokemons(data.results);
        setFilteredPokemons(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const handleSearchClick = () => {
    const filteredData = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPokemons(filteredData);
  };

  return (
    <>
      <Header onSearchChange={handleSearchChange} onSearchClick={handleSearchClick} />
      <PokeList pokemons={filteredPokemons} loading={loading} />
    </>
  );
}

export default App;
