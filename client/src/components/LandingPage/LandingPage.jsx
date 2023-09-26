import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.Landing__Container}>
      <div className={style.Landing__text}>
        <h1 className="Landing__title">Welcome to my dogs app</h1>

        <Link className="Landing__Button" to={"/home"}>
          Home
        </Link>
      </div>
    </div>
  );
}
