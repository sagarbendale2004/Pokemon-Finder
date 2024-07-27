import React from "react";

function Card({ pokemonData }) {
  return (
    <li className="pokemon-card">
      <figure className="background">
        <img
          src={pokemonData.sprites.other.dream_world.front_default}
          alt={pokemonData.name}
          className="pokemon-image"
        />
      </figure>

      <h1 className="pokemon-name">{pokemonData.name}</h1>
      <div className="pokemon-info pokemon-highlight">
        <p>{pokemonData.types.map((elem) => elem.type.name).join(", ")}</p>
      </div>

      <div className="poke-data">
        <p className="pokemon-info">
          <span>height: </span>
          {pokemonData.height}
        </p>

        <p className="pokemon-info">
          <span>weight: </span>
          {pokemonData.weight}
        </p>

        <p className="pokemon-info">
          <span>speed: </span> {pokemonData.stats[5].base_stat}
        </p>
      </div>

      <div className="poke-data">
        <div className="pokemon-info">
          <p>{pokemonData.base_experience}</p>
          <span>Experience:</span>
        </div>

        <div className="pokemon-info">
          <p>{pokemonData.stats[1].base_stat}</p>
          <span>Attack:</span>
        </div>

        <div className="pokemon-info">
          <p>
            {pokemonData.abilities
              .map((elem) => elem.ability.name)
              .slice(0, 1)
              .join(", ")}
          </p>
          <span>Abilites:</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
