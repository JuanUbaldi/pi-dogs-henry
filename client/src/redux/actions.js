import axios from "axios";
import {
  ADD_DOGS,
  DOGS_DB,
  DOGS_API,
  ON_SEARCH_ID,
  ON_SEARCH_NAME,
  ALL_TEMPERAMENTS,
  FILTER_TEMPERAMENTS,
  FILTER_ORIGINS,
  FILTER_AOZ,
  RESET,
  FILTER_WEIGHT,
  CREATE_DOG,
} from "./actions-type";
const URL_ALL = "http://localhost:3001/allDogs/dogs";
const URL_DOG_ID = "http://localhost:3001/allDogs/dog";

const URL_APIDOGS = "http://localhost:3001/allDogs/apiDogs";
const URL_DB = "http://localhost:3001/allDogs/dogsDB";
const URL_TEMPERAMENTS = "http://localhost:3001/temperaments/all";

export const addDogs = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL_ALL}`);
      return dispatch({
        type: ADD_DOGS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const dogsDB = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL_DB}`);

      return dispatch({
        type: DOGS_DB,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const apiDogs = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL_APIDOGS}`);

      return dispatch({
        type: DOGS_API,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const onSearchId = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL_DOG_ID}/${id}`);
      dispatch({
        type: ON_SEARCH_ID,
        payload: data,
      });
    } catch (error) {
      alert(`Lo sentimos pero no tenemos ese perro`);
    }
  };
};

export const onSearchName = (name) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/allDogs/?name=${name}`
      );
      dispatch({
        type: ON_SEARCH_NAME,
        payload: data,
      });
    } catch (error) {
      alert(`Sorry but we don't have any matches`);
    }
  };
};

export const allTemperaments = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_TEMPERAMENTS}`);
      dispatch({
        type: ALL_TEMPERAMENTS,
        payload: data,
      });
    } catch (error) {
      alert(`${error.message}`);
    }
  };
};

export const createDog = (dog) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(`${URL_ALL}`, dog);
      console.log("holaaa yo soy la dataa" + data);
      return dispatch({
        type: CREATE_DOG,
        payload: data,
      });
    } catch (error) {
      alert(`Lo sentimos pero el perro, ya se encuentra en la base de datos`);
    }
  };
};

export const filterTemperaments = (temperaments) => {
  return {
    type: FILTER_TEMPERAMENTS,
    payload: temperaments,
  };
};

export const filterOrigins = (AoD) => {
  return {
    type: FILTER_ORIGINS,
    payload: AoD,
  };
};

export const filterAz = (selectedValue) => {
  return {
    type: FILTER_AOZ,
    payload: selectedValue,
  };
};

export const filterWeight = (hOg) => {
  return {
    type: FILTER_WEIGHT,
    payload: hOg,
  };
};

export const reset = () => {
  return {
    type: RESET,
  };
};
