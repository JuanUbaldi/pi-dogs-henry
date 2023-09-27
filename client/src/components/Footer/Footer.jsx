import React from "react";
import style from "./Footer.module.css";
export default function Footer() {
  return (
    <div>
      <div className={style.footer}>
        <a
          className={style.aFooter}
          href="https://github.com/JuanUbaldi"
          target="_blank"
        >
         github
        </a>

        <a
          className={style.aFooter}
          href="https://ar.linkedin.com/in/juanubaldi"
          target="_blank"
        >
         linkedIn
        </a>
      </div>
    </div>
  );
}
