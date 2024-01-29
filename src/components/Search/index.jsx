import React, { useState } from "react";
import Search from "antd/es/input/Search";
import { openErrorNotification } from "../../App";
const SearchSide = ({ pokemonData, setPokemonData }) => {
  const [searchValue, setSearchValue] = useState("");

  const onSearch = (value) => {
    const searchTerm = value.toLowerCase();
    setSearchValue(value);
    if (!value) {
      setPokemonData(pokemonData);
      return;
    }
    const filteredData = pokemonData.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm)
    );

    setPokemonData({
      count: filteredData.length,
      next: null,
      previous: null,
      results: filteredData,
    });

    if (filteredData.length === 0) {
      openErrorNotification(`Pokemon with name ${value} not found`);
    }
  };
  return (
    <div>
      <Search
        allowClear
        onChange={(e) => onSearch(e.target.value)}
        value={searchValue}
      />
    </div>
  );
};

export default SearchSide;
