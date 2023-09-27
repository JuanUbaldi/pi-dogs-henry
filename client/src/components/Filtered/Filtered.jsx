import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Filtered.module.css";
import {
  filterAz,
  filterOrigins,
  filterTemperaments,
  filterWeight,
  reset,
} from "../../redux/actions";

export default function Filtered() {
  const temperaments = useSelector((state) => state.temperaments);

  const dispatch = useDispatch();

  const handleOrigin = (event) => {
    dispatch(filterOrigins(event.target.value));
  };

  const handleAoZ = (event) => {
    dispatch(filterAz(event.target.value));
  };

  const handleFilterTemp = (event) => {
    dispatch(filterTemperaments(event.target.value));
  };

  const handleFilterWeight = (event) => {
    dispatch(filterWeight(event.target.value));
  };

  const handleReset = () => {
    console.log("Handle Reset called");
    dispatch(reset());
  };

  return (
    <div className={style.selectedFilters}>
      {
        <div className={style.selectedOne}>
          <h3>Origins</h3>
          <select name="Origin" onChange={handleOrigin}>
            <option value="Default" disabled>
              (Select Origin)
            </option>
            <option value="ALL">All</option>
            <option value="API">Api</option>
            <option value="DB">Db</option>
          </select>
        </div>
      }

      <div className={style.selectedOne}>
        <h3>Alphabetic</h3>
        <select name="A_Z" onChange={handleAoZ} defaultValue="Default">
          <option value="Default">(Select Order)</option>
          <option value="A">A - Z</option>
          <option value="Z">Z - A</option>
        </select>
      </div>

      <div className={style.selectedOne}>
        <h3>Temperaments</h3>
        {
          <select
            name="temperaments"
            onChange={handleFilterTemp}
            defaultValue="Default"
          >
            <option value="Default">(Select Temperament)</option>
            <option value="Alldogs">All Dogs</option>
            {temperaments.map((temperament) => (
              <option value={temperament}>{temperament}</option>
            ))}
          </select>
        }
      </div>

      <div className={style.selectedOne}>
        <h3>Weight</h3>
        <select
          name="Weight"
          onChange={handleFilterWeight}
          defaultValue="Default"
        >
          <option value="Default">(Select Weight)</option>
          <option value="maximum">Maximum</option>
          <option value="minimum">Minimum</option>
        </select>
      </div>

      <button className={style.buttonReset} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
