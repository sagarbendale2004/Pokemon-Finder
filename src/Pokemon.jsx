import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import "../src/index.css";

function Pokemon() {
  const API = "https://pokeapi.co/api/v2/pokemon?limit=24";
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [search, setSearch] = useState("");

  const fetchPokemon = async () => {
    try {
      const response = await fetch(API);
      const dat = await response.json();

      const detailedPokemonData = dat.results.map(async (currElem) => {
        const res = await fetch(currElem.url);
        const data = await res.json();
        return data;
      });

      const detailedResponse = await Promise.all(detailedPokemonData);
      console.log(detailedResponse);

      setPokemon(detailedResponse);
      setLoading(false);
    } catch (error) {
      console.log("error in fetch", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  //Search Functionality

  const searchData = pokemon.filter((currPokemonCard) =>
    currPokemonCard.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Loading....</h1>
      </div>
    );

  if (error)
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>{error.message}</h1>
      </div>
    );

  return (
    <section className="container">
      <header>
        <h1 className="heading center">Lets Catch Pokémon</h1>
      </header>

      <div>
        <input
          type="text"
          name="search"
          className="input"
          placeholder="Search Pokemon Here.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ul>
        {searchData.map((currPokemon) => {
          return <Card key={currPokemon.id} pokemonData={currPokemon} />;
        })}
      </ul>
    </section>
  );
}

export default Pokemon;
