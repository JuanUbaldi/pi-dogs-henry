import React from "react";
import style from "./HomePage.module.css";
import Cards from "../Cards/Cards";
import Filtered from "../Filtered/Filtered";
import SearchBar from "../SearchBar/SearchBar";
const HomePage = () => {
  return (
    <div className={style.home_page}>
      <div className={style.searchBar}>
        <SearchBar />
      </div>
      <Filtered />
      <Cards />
    </div>
  );
};

export default HomePage;
