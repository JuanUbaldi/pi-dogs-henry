const axios = require("axios");
const { Temperament } = require("../db");
const { YOUR_API_KEY } = process.env;

async function getTemperaments() {
  const { data } = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
  );

  const temperamentsBd = data.map((breed) => breed.temperament);
  const uniqueTemperaments = temperamentsBd
    .join(",")
    .split(",")
    .map((temp) => temp.trim())
    .filter((temp, index, array) => temp && array.indexOf(temp) === index);

  for (const temp of uniqueTemperaments) {
    await Temperament.findOrCreate({ where: { name: temp } });
  }

  return uniqueTemperaments;
}

/* async function giveMeAllTemperaments() {
  const allTemperaments = await Temperament.findAll();
  return allTemperaments;
} */

module.exports = {
  getTemperaments /* ,
  giveMeAllTemperaments, */,
};
