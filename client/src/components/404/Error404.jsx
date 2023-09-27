import React from "react";
import { Link } from "react-router-dom";
import style from "./notFound.module.css";

export default function Error404() {
  return (
    <div className={style.ErrorTotal}>
      <div className={style.Error}>
      <h2 className={style.errorH2}>ERROR 404</h2>
      <Link to={"/home"}>
        <button className={style.buttonError}>Go Home</button>
      </Link>
    </div>
    </div>
  );
}
