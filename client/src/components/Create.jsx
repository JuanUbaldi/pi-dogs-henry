import React, { useEffect } from "react";

import { useState } from "react";

import validation from "./Validation";
import { createDog } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Create() {
  const navigate = useNavigate();

  const temperaments = useSelector((state) => state.temperaments);

  const dispatch = useDispatch();

  const [dogsData, setDogsData] = useState({
    id: "",
    name: "",
    image: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    min_lifeSpan: "",
    max_lifeSpan: "",
    temperaments: [],
    newTemperaments: "",
    selectedTemperament: "Default",
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    min_lifeSpan: "",
    max_lifeSpan: "",
    temperaments: [],
    selectedTemperament: "Default",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const finalyData = {
      ...dogsData,

      height: `${dogsData.min_height} - ${dogsData.max_height}`,
      weight: `${dogsData.min_weight} - ${dogsData.max_weight}`,
      life_span: `${dogsData.min_lifeSpan} - ${dogsData.max_lifeSpan} years`,
      temperaments: dogsData.temperaments,
      newTemperaments: dogsData.newTemperaments,
    };
    console.log(finalyData.newTemperaments);
    dispatch(createDog(finalyData));

    alert("Su perro se ha creado correctamente");
    resetForm();
  };

  const handleChange = (event) => {
    setDogsData({
      ...dogsData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const errosValidation = validation(dogsData);
    setErrors(errosValidation);
  }, [dogsData]);

  const resetForm = () => {
    setDogsData({
      id: "",
      name: "",
      image: "",
      min_height: "",
      max_height: "",
      min_weight: "",
      max_weight: "",
      min_lifeSpan: "",
      max_lifeSpan: "",
      temperaments: [],
      temperamentsExtra: "",
    });
  };

  const handleTemps = (event) => {
    const selected = event.target.value;

    if (selected !== "Default") {
      setDogsData((prevDogsData) => ({
        ...prevDogsData,
        temperaments: [...prevDogsData.temperaments, selected], // Usar join para convertir a string
        selectedTemperament: "Default",
      }));
    }
  };

  const handleRemoveTemp = (tempToRemove) => {
    const updatedSelectTemp = dogsData.temperaments.filter(
      (temp) => temp !== tempToRemove
    );
    setDogsData({ ...dogsData, temperaments: updatedSelectTemp });
  };

  /*   const hasErrors = Object.values(errors).some((error) => error !== ""); */

  return (
    <div className="Container__Create">
      */
      <form className="Form__Create" action="post" onSubmit={handleSubmit}>
        <label className="Form__Label" htmlFor="name">
          Name
          <input
            className="Form__Input"
            id="name"
            type="text"
            value={dogsData.name}
            onChange={handleChange}
            name="name"
          />
          {errors.name && <p>{errors.name}</p>}
        </label>

        <label className="Form__Label" htmlFor="image">
          Imagen
          <input
            className="Form__Input"
            id="image"
            type="text"
            onChange={handleChange}
            value={dogsData.image}
            name="image"
          />
          {errors.image && <p>{errors.image}</p>}
        </label>

        <label className="Form__Label" htmlFor="height">
          Height
          <div className="Label__Height">
            <input
              className="Form__Input Form__Input--Height"
              id="min_height"
              type="number"
              onChange={handleChange}
              value={dogsData.min_height}
              name="min_height"
              placeholder="Minimum"
            />

            <input
              className="Form__Input Form__Input--Height"
              id="max_height"
              type="number"
              onChange={handleChange}
              value={dogsData.max_height}
              name="max_height"
              placeholder="Maximum"
            />
          </div>
          {<p>{errors.min_height}</p> && <p>{errors.min_height}</p>}
        </label>

        <label className="Form__Label" htmlFor="weight">
          Weight
          <div className="Label__Height">
            <input
              className="Form__Input"
              id="min_weight"
              type="number"
              onChange={handleChange}
              value={dogsData.min_weight}
              name="min_weight"
              placeholder="Minimum"
            />

            <input
              className="Form__Input"
              id="max_weight"
              type="number"
              onChange={handleChange}
              value={dogsData.max_weight}
              name="max_weight"
              placeholder="Maximium"
            />
          </div>
        </label>
        {errors.weight1 && <p>{errors.weight1}</p>}

        <label className="Form__Label" htmlFor="life_span">
          Life Span
          <input
            className="Form__Input"
            id="min_lifeSpan"
            type="text"
            onChange={handleChange}
            value={dogsData.min_lifeSpan}
            name="min_lifeSpan"
          />
          <input
            className="Form__Input"
            id="max_lifeSpan"
            type="text"
            onChange={handleChange}
            value={dogsData.max_lifeSpan}
            name="max_lifeSpan"
          />
          {errors.life_span && <p>{errors.life_span}</p>}
        </label>

        <label className="Form__Label" htmlFor="temperament">
          Temperaments
          <select onChange={handleTemps} value={dogsData.selectedTemperament}>
            <option value="Default" disabled>
              (Select Temperaments)
            </option>
            {Array.isArray(temperaments) &&
              temperaments?.map((temperament, index) => {
                return (
                  <option value={temperament} key={index}>
                    {temperament}
                  </option>
                );
              })}
          </select>
        </label>
        <label className="Form__Label" htmlFor="newTemperament">
          New Temperament
          <input
            className="Form__Input"
            id="newTemperaments"
            type="text"
            onChange={handleChange}
            value={dogsData.newTemperaments}
            name="newTemperaments"
          />
        </label>
        <div className="cls">
          {dogsData.temperaments.map((selectedTemp, index) => (
            <div key={index}>
              <h4>{dogsData.selectedTemp}</h4>
              <button
                type="button"
                onClick={() => handleRemoveTemp(selectedTemp)}
              >
                x
              </button>
              <p>{selectedTemp}</p>
            </div>
          ))}
          <div>
            <h3>{dogsData.newTemperaments}</h3>
          </div>

          {errors.temperaments && <p>{errors.temperaments}</p>}
        </div>

        {Object.keys(errors).length === 0 ? (
          <input className="Form__submit" type="submit" value="Submit" />
        ) : null}
      </form>
    </div>
  );
}
