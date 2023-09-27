import React from "react";
import style from "./Paginated.module.css";

export default function Paginated({
  currentPage,
  charactersPerPage,
  allCharacters,
  paginated,
}) {
  const pageNumbers = [];
  for (let i = 0; i <= allCharacters / charactersPerPage; i++) {
    pageNumbers.push(i + 1);
  }

  const prevPage = () => {
    const newPage = currentPage - 1;
    if (newPage >= 1) {
      paginated(newPage);
      console.log(newPage);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= pageNumbers.length && page !== currentPage) {
      paginated(page);
      console.log(page);
    }
  };

  return (
    <nav>
      <ul className={style.ulPaginated}>
        <img src="./sogaDerecha.png" alt="" height={80} width={80} />
        <button onClick={prevPage}>Prev</button>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li>
              <div className={style.ulPaginatedSingle}>
                <a onClick={() => paginated(number)}>{number}</a>{" "}
              </div>
            </li>
          ))}

        <button
          disabled={currentPage === pageNumbers.length}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </button>
        <img src="./sogaDerecha.png" alt="" height={80} width={80} />
      </ul>
      <img src="" alt="" />
    </nav>
  );
}
