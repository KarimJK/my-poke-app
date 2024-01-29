import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { openErrorNotification } from "../../App";
import axios from "axios";
import { Link } from "react-router-dom";
const PokemonCardItem = ({ pokemon }) => {
  const [loading, setLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState();

  const getOnePok = async () => {
    try {
      const response = await axios.get(pokemon?.url);
      setPokemonData(response.data);
      setLoading(false);
    } catch (error) {
      openErrorNotification("Error fetching Pokemon data");
    }
  };

  useEffect(() => {
    setLoading(true);
    getOnePok();
  }, []);

  return (
    <div className="pokemon-card">
      <Link to={`pokemon/${pokemonData?.id}`}>
        <Card loading={loading}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
              pokemonData ? pokemonData?.id : null
            }.svg`}
            alt=""
          />
          <p>{pokemon.name}</p>
        </Card>
      </Link>
    </div>
  );
};

export default PokemonCardItem;
