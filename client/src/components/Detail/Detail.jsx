import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onSearchId } from "../../redux/actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";

export default function Detail() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { onSearchById } = useSelector((state) => state);
  console.log(onSearchById);
  useEffect(() => {
    dispatch(onSearchId(id));
  }, [dispatch]);

  return (
    <div className={style.Detail}>
      <div className={style.DetailContent}>
        <img
          src={onSearchById.image}
          alt={onSearchById.name}
          height={200}
          width={200}
        />
        <div>
          <h1>{onSearchById.name}</h1>
          <br />
          <h3>Weight: {onSearchById.weight} Pounds</h3>
          <h3>Height: {onSearchById.height} Inches</h3>
          <h3>Life Span: {onSearchById.years}</h3>
          <h3>Temperaments :</h3>
          <h5>{onSearchById.temperament}</h5>
        </div>

        <Link to={"/home"}>
          <button className={style.DetailButton}>volver a home</button>
        </Link>
      </div>
    </div>
  );
}
