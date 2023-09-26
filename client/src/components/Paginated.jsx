import React from "react";

export default function Paginated({
  charactersPerPage,
  allCharacters,
  paginated,
}) {
  const pageNumbers = [];
  for (let i = 0; i <= allCharacters / charactersPerPage; i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <nav>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li>
              <a onClick={() => paginated(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
