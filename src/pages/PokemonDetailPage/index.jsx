import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import { Card } from "antd";
import { openErrorNotification } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";

const PokemonDetailPage = () => {
  var { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState();
  const [loading, setLoading] = useState(false);
  const getPokemonWithId = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setPokemon(response.data);
      setLoading(false);

      return;
    } catch (error) {
      openErrorNotification(`Error fetching Pokemon with ID ${id}`);
      throw error;
    }
  };
  useEffect(() => {
    setLoading(true);
    getPokemonWithId();
  }, []);
  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="detail-page">
      <Card className="pokemon-card">
        <div className="back" onClick={navigateBack}>
          ← Back
        </div>
        <div className="card-header">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
              pokemon ? pokemon.id : null
            }.svg`}
            alt=""
          />
        </div>
        <div className="ability">
          <h1>Abilities</h1>
          {pokemon?.abilities.map((el, index) => (
            <p key={index} className="ability-item">
              {el.ability.name}
            </p>
          ))}
        </div>
        <div className="stats">
          <h2>Stats</h2>
          <ul>
            {pokemon?.stats?.map((item, index) => (
              <li key={index} className="stats-item">
                {item.stat.name}: {item.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </Card>
      {loading && <Loading />}
    </div>
  );
};

export default PokemonDetailPage;
