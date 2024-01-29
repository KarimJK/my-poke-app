// PokemonList.js

import PokemonCardItem from "../PokemonCardItem";
import "./style.scss";

const PokemonList = ({ pokemonData }) => {
  return (
    <div className="pokemon-list">
      <div className="pokemon-cards">
        {pokemonData?.results?.map((pokemon) => (
          <PokemonCardItem key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
