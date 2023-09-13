const STATUS_OK = 200;
const STATUS_ERROR = 404;
const URL = 'https://api.thedogapi.com/v1/breeds'
const axios = require("axios")
const { Temperament } = require("../db")


const getTemperaments = async function(req, res) {
    try {
        const { data } = await axios.get(`${URL}`);
        const temperamentsArray = data.map(breed => breed.temperament);
        const uniqueTemperaments = temperamentsArray
          .join(',')
          .split(',')
          .map(temp => temp.trim())
          .filter((temp, index, array) => temp && array.indexOf(temp) === index);
    
        for (const temp of uniqueTemperaments) {
          await Temperament.findOrCreate({ where: { name: temp } });
        }
    
        res.status(STATUS_OK).json(uniqueTemperaments);
      } catch (error) {
        res.status(STATUS_ERROR).json({ error: error.message });
      }
    };

module.exports = {
    getTemperaments
}