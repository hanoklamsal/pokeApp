import "./App.css";
import Header from "./components/Header";
import PokeList from "./components/PokeList";
import PokeDetails from "./components/PokeDetails";
import Favourites from "./components/Favorites";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {FavoritesProvider} from "./context/FavoriteContext";

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
        const enrichedData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              ...pokemon,
              id: details.id,
              sprites: details.sprites,
              types: details.types.map(t => t.type.name),
            };
          })
        );
        setPokemons(enrichedData);
        setFilteredPokemons(enrichedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  const handleSearchChange = (text) => setSearchText(text);

  const handleSearchClick = () => {
    const filteredData = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPokemons(filteredData.length ? filteredData : pokemons);
  };

  return (
    <FavoritesProvider>
      <Header onSearchChange={handleSearchChange} onSearchClick={handleSearchClick} />
      <Routes>
        <Route path="/" element={<PokeList pokemons={filteredPokemons} loading={loading} />} />
        <Route path="/pokedetails/:id" element={<PokeDetails />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </FavoritesProvider>
  );
}

export default App;
