import React, { useEffect, useState } from "react";
import "./style.scss";
import PokemonList from "../../components/PokemonList";
import SearchSide from "../../components/Search";
import { openErrorNotification } from "../../App";
import { Pagination } from "antd";
import Loading from "../../components/Loading";
import axios from "axios";

const HomePage = () => {
  const [pokemonData, setPokemonData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [filteredPokemonData, setFilteredPokemonData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const getAllPoks = async (url) => {
    try {
      const response = await axios.get(url);
      setPokemonData(response.data);
      setFilteredPokemonData(response.data);
      setLoading(false);
    } catch (error) {
      openErrorNotification("Error fetching Pokemon data");
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllPoks("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20");
  }, []);

  const handlePageChange = (page, pageSize) => {
    const offset = (page - 1) * pageSize;
    setPageSize(pageSize);
    setLoading(true);
    getAllPoks(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${pageSize}`
    );
    setCurrentPage(page);
  };

  return (
    <div>
      <SearchSide
        pokemonData={pokemonData}
        setPokemonData={setFilteredPokemonData}
      />
      <PokemonList pokemonData={filteredPokemonData} />
      <Pagination
        current={currentPage}
        total={pokemonData.count}
        pageSize={pageSize}
        onChange={handlePageChange}
      />
      {loading && <Loading />}
    </div>
  );
};

export default HomePage;
