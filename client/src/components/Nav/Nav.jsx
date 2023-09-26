
import { Link, useNavigate } from "react-router-dom";

import style from "./Nav.module.css";

export default function Nav() {
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    navigate(path);
  };

  return (
    <div className={style.navBar}>
      <div>
        <div>
          <ul className={style.navBarList}>
            <li className={style.Nav__Li}>
              <Link
                className={style.Nav__Link}
                to="/home"
                onClick={() => handleLinkClick("/home")}
              >
                Home
              </Link>
            </li>
            <li className={style.Nav__Li}>
              <Link
                className={style.Nav__Link}
                to="/create"
                onClick={() => handleLinkClick("/create")}
              >
                Create
              </Link>
            </li>

            <img src="./nav.jpg" alt="" width={250} height={220} />

            <li className={style.Nav__Li}>
              <Link
                className={style.Nav__Link}
                to="/about"
                onClick={() => handleLinkClick("/about")}
              >
                About
              </Link>
            </li>
            <li className={style.Nav__Li}>
              <Link
                className={style.Nav__Link}
                to="/"
                onClick={() => handleLinkClick("/")}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
    
      </div>
    </div>
  );
}
