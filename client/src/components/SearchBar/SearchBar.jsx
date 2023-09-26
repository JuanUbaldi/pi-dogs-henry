import React from "react";
import { useState } from "react";
import style from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { onSearchName } from "../../redux/actions";

export default function SearchBar() {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const add = () => {
    dispatch(onSearchName(name));
    setName("");
  };

  return (
    <div className={style.searchBarInput}>
      <h4 className={style.h4Input}>Choose a doggy´s name: </h4>
      <input
        value={name}
        onChange={handleChange}
        type="search"
        placeholder="Enter your name"
      />

      <button onClick={add}>Search</button>
    </div>
  );
}
