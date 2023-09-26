import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import Paginated from "../Paginated";
import style from "./Cards.module.css";

import { useState, useEffect } from "react";

export default function Cards() {
  const { dogs } = useSelector((state) => state);
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage, setCharactersPerPage] = useState(8);
  const [currentCharacters, setCurrentCharacters] = useState([]);

  const indexOFLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharactetr = indexOFLastCharacter - charactersPerPage;
  useEffect(() => {
    const allCurrentCharacters = dogs?.slice(
      indexOfFirstCharactetr,
      indexOFLastCharacter
    );
    setCurrentCharacters(allCurrentCharacters);
  }, [dogs, indexOfFirstCharactetr, indexOFLastCharacter]);

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (id) => {
    console.log(typeof id);
    let updatedCharacters = currentCharacters.filter((el) => el.id != id);
    console.log(updatedCharacters);
    setCurrentCharacters(updatedCharacters);
  };

  return (
    <div>
      <div>
        <div className={style.cardsContent}>
          {currentCharacters.map(
            ({ id, name, weight, height, years, image, temperament }) => {
              return (
                <Card
                  key={id}
                  id={id.toString()}
                  name={name}
                  weight={weight}
                  height={height}
                  life_span={years}
                  image={image}
                  temperaments={temperament}
                  handleDelete={handleDelete}
                />
              );
            }
          )}
        </div>
      </div>
      {
        <Paginated
          paginated={paginated}
          charactersPerPage={charactersPerPage}
          allCharacters={dogs.length}
        />
      }
    </div>
  );
}
