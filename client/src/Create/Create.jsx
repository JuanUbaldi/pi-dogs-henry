import React, { useEffect } from "react";
import style from "./Create.module.css";
import { useState } from "react";
import validation from "../components/Validation";
import { addDogs, createDog } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Create() {
  const [validateNameError, setValidateNameError] = useState("");
  const navigate = useNavigate();
  const temperaments = useSelector((state) => state.temperaments);
  const dogs = useSelector((state) => state.dogs);
  const dispatch = useDispatch();
  const [habilityName, setHabilityName] = useState("");

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
    validateName: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const finalyData = {
      ...dogsData,
      height: `${dogsData.min_height} - ${dogsData.max_height}`,
      weight: `${dogsData.min_weight} - ${dogsData.max_weight}`,
      life_span: `${dogsData.min_lifeSpan} - ${dogsData.max_lifeSpan} years`,
      temperaments: dogsData.temperaments,
    };
    dispatch(createDog(finalyData));
    resetForm();
    navigate("/home");
  };

  const handleChange = (event) => {
    setDogsData({
      ...dogsData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    dispatch(addDogs());
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
    });
  };

  const handleTemps = (event) => {
    const selected = event.target.value;

    if (selected !== "Default" && !dogsData.temperaments.includes(selected)) {
      setDogsData((prevDogsData) => ({
        ...prevDogsData,
        temperaments: [...prevDogsData.temperaments, selected],
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

  function validateNameFun(dogsData) {
    if (dogsData.name && dogs.find((dog) => dog.name === dogsData.name)) {
      setValidateNameError("Name already exists.");
    } else {
      setValidateNameError(null);
      setHabilityName("Name available");
    }
  }

  return (
    <div className={style.Container}>
      <h1 className={style.h1Container}>Create your doggy</h1>
      <button
        className={style.buttonContainer}
        onClick={() => validateNameFun(dogsData)}
      >
        validate name
      </button>
      <form action="post" onSubmit={handleSubmit}>
        <div className={style.Create__Container}>
          <div className={style.CreateLeftContainer}>
            <h3> Name</h3>
            <label htmlFor="name">
              <input
                id="name"
                type="text"
                value={dogsData.name}
                onChange={handleChange}
                name="name"
              />
              {errors.name && (
                <p className={style.errorsValidation}> {errors.name}</p>
              )}
              <h1>{habilityName}</h1>

              <h1>{validateNameError}</h1>
            </label>

            <h3>Imagen</h3>
            <label className="Form__Label" htmlFor="image">
              <input
                id="image"
                type="text"
                onChange={handleChange}
                value={dogsData.image}
                name="image"
              />
              {errors.image && (
                <p className={style.errorsValidation}>{errors.image}</p>
              )}
            </label>

            <h3>Height</h3>
            <label htmlFor="height">
              <input
                id="min_height"
                type="number"
                onChange={handleChange}
                value={dogsData.min_height}
                name="min_height"
                placeholder="Minimum"
              />
            </label>
            <label>
              <input
                id="max_height"
                type="number"
                onChange={handleChange}
                value={dogsData.max_height}
                name="max_height"
                placeholder="Maximum"
              />
            </label>
            {<p>{errors.min_height}</p> && (
              <p className={style.errorsValidation}>{errors.min_height}</p>
            )}
          </div>

          <div className={style.CreateRightContainer}>
            <h3> Weight</h3>
            <label htmlFor="weight">
              <input
                id="min_weight"
                type="number"
                onChange={handleChange}
                value={dogsData.min_weight}
                name="min_weight"
                placeholder="Minimum"
              />
            </label>
            <label className="Form__Label" htmlFor="weight">
              <input
                id="max_weight"
                type="number"
                onChange={handleChange}
                value={dogsData.max_weight}
                name="max_weight"
                placeholder="Maximium"
              />
            </label>
            {errors.min_weight && (
              <p className={style.errorsValidation}>{errors.min_weight}</p>
            )}

            <h3>Life Span</h3>
            <label htmlFor="life_span">
              <input
                className="Form__Input"
                id="min_lifeSpan"
                type="text"
                onChange={handleChange}
                value={dogsData.min_lifeSpan}
                name="min_lifeSpan"
              />
            </label>
            <label className="Form__Label" htmlFor="life_span">
              <input
                id="max_lifeSpan"
                type="text"
                onChange={handleChange}
                value={dogsData.max_lifeSpan}
                name="max_lifeSpan"
              />
            </label>
            {errors.min_lifeSpan && (
              <p className={style.errorsValidation}>{errors.min_lifeSpan}</p>
            )}

            <h3>Temperaments</h3>
            <label htmlFor="temperament">
              <select
                onChange={handleTemps}
                value={dogsData.selectedTemperament}
              >
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
            {errors.temperaments && (
              <p className={style.errorsValidation}>{errors.temperaments}</p>
            )}
          </div>
        </div>

        {!errors.name &&
        !errors.image &&
        !errors.min_height &&
        !errors.max_height &&
        !errors.min_weight &&
        !errors.max_weight &&
        !errors.min_lifeSpan &&
        !errors.max_lifeSpan &&
        !errors.temperaments &&
        habilityName === "Name available" ? (
          <input className={style.buttonForm} type="submit" value="Submit" />
        ) : null}
      </form>

      <div className={style.temps}>
        {dogsData.temperaments.map((selectedTemp, index) => (
          <div key={index}>
            <button
              type="button"
              onClick={() => handleRemoveTemp(selectedTemp)}
            >
              x
            </button>
            <p>{selectedTemp}</p>
          </div>
        ))}
      </div>
      <h2 className={style.message}>Don´t forget take care of the doggys </h2>
    </div>
  );
}
