import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card({
  id,
  name,
  weight,
  image,
  temperaments,
  handleDelete,
}) {
  
  return (
    <div className={style.cardContent}>
      <div>
        <button
          onClick={() => {
            handleDelete(id);
          }}
        >
          x
        </button>
        <img src={image} alt={name} width={350} height={280} />

        <h2>{name}</h2>
      </div>

      <div>
        <h3>Weight : </h3>
        <h3>{weight} Pounds</h3>
        <h3>Temperaments:</h3>
        <h4>{temperaments} </h4>
        <div>
          <Link to={`/detail/${id}`}>See More +</Link>
        </div>
      </div>
    </div>
  );
}
