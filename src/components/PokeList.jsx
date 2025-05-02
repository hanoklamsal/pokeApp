import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import styles from "./PokeList.module.css";

const PokeList = ({ pokemons, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedType, setSelectedType] = useState("");
  const [types, setTypes] = useState([]);
  const [typeLoading, setTypeLoading] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      setTypeLoading(true);
      const res = await fetch("https://pokeapi.co/api/v2/type");
      const data = await res.json();
      setTypes(data.results);
      setTypeLoading(false);
    };
    fetchTypes();
  }, []);

  const filteredPokemons = useMemo(() => {
    if (!selectedType) return pokemons;
    return pokemons.filter(pokemon =>
      pokemon.types.includes(selectedType)
    );
  }, [pokemons, selectedType]);

  const sortedPokemons = useMemo(() => {
    return [...filteredPokemons].sort((a, b) => {
      const valA = sortBy === "name" ? a.name : a.id;
      const valB = sortBy === "name" ? b.name : b.id;
      return sortOrder === "asc"
        ? valA > valB ? 1 : -1
        : valA < valB ? 1 : -1;
    });
  }, [filteredPokemons, sortBy, sortOrder]);

  const currentPokemons = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedPokemons.slice(start, start + itemsPerPage);
  }, [sortedPokemons, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

  const handleTypeChange = useCallback((e) => {
    setSelectedType(e.target.value);
    setCurrentPage(1);
  }, []);

  return (
    <div>
      {(loading || typeLoading) ? (
        <p style={{ textAlign: "center", fontWeight: "bold" }}>Loading...</p>
      ) : (
        <>
          <div className={styles.controls}>
            <div>
              <label>Sort by: </label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="id">ID</option>
                <option value="name">Name</option>
              </select>
              <button onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}>
                {sortOrder === "asc" ? "ASC" : "DESC"}
              </button>
            </div>

            <div>
              <label>Items per page: </label>
              <select value={itemsPerPage} onChange={e => setItemsPerPage(Number(e.target.value))}>
                {[10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            <div>
              <label>Filter by type:</label>
              <select value={selectedType} onChange={handleTypeChange}>
                <option value="">All</option>
                {types.map(type => (
                  <option key={type.name} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles["pokelist-container"]}>
            {currentPokemons.map(pokemon => (
              <Link key={pokemon.id} to={`/pokedetails/${pokemon.id}`}>
                <Card data={pokemon} />
              </Link>
            ))}
          </div>

          <div className={styles.pagination}>
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
              Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PokeList;
