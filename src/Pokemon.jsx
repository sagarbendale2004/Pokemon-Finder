import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import "../src/index.css";

function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [search, setSearch] = useState("");
  const [pageNo, setPageNo] = useState(0);
  const API = `https://pokeapi.co/api/v2/pokemon?offset=${pageNo}&limit=20`;

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
  }, [pageNo]);

  //Search Functionality

  const searchData = pokemon.filter((currPokemonCard) =>
    currPokemonCard.name.toLowerCase().includes(search.toLowerCase())
  );

  // check Error or Loading
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

  //Pagination Functionality

  const handleNext = () => {
    setPageNo(pageNo + 20);
  };

  const handlePrev = () => {
    if (pageNo >= 20) {
      setPageNo(pageNo - 20);
    }
  };

  const prevThreeNo = Array.from(
    { length: 3 },
    (_, index) => pageNo - (index + 1) * 20
  )
    .filter((value) => value >= 0)
    .reverse();

  const nextFourNo = Array.from(
    { length: 4 },
    (_, index) => pageNo + (index + 1) * 20
  );

  const PaginationArray = [...prevThreeNo, pageNo, ...nextFourNo];

  return (
    <section className="container">
      <header>
        <h1 className="heading center">Let's Catch Pokémon</h1>
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
        {searchData.length > 0 ? (
          searchData.map((currPokemon) => (
            <Card key={currPokemon.id} pokemonData={currPokemon} />
          ))
        ) : (
          <li
            style={{
              textAlign: "center",
              listStyle: "none",
              fontSize: "1.3rem",
              color: "red",
              marginBottom: "1rem",
            }}
          >
            please check another page and search your pokemon.
          </li>
        )}
      </ul>

      <div className="pagination-container">
        {pageNo > 0 && (
          <div className="page-btn" onClick={handlePrev}>
            {"<"}
          </div>
        )}

        {PaginationArray.map((value, index) => (
          <div
            onClick={() => setPageNo(value)}
            className={pageNo === value ? "page-btn active" : "page-btn"}
            key={value}
          >
            {value / 20 + 1} {/* Adjusting for 0-based indexing */}
          </div>
        ))}

        <div className="page-btn" onClick={handleNext}>
          {">"}
        </div>
      </div>

      <footer className="footer">
        <div className="footer-text">© 2024 by Sagar Bendale.</div>
      </footer>
    </section>
  );
}

export default Pokemon;
