const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const URL = "https://api.thedogapi.com/v1/breeds?api_key=";
const STATUS_OK = 200;
const STATUS_ERROR = 404;
const getDogs = async function (req, res) {
  try {
    const { data } = await axios.get(`${URL}/${YOUR_API_KEY}`);
    
    const dogsMap = [];
    await data.map((dogR) => {
      const dogNews = {
        id: dogR.id,
        name: dogR.name,
        weight: dogR.weight.imperial,
        height: dogR.height.imperial,
        life_span: dogR.life_span,
        image: dogR.image.url,
        temperament: dogR.temperament,
      };
      dogsMap.push(dogNews);
    });
    console.log(dogsMap);
    res.status(STATUS_OK).json(dogsMap);
  } catch (error) {
    res.status(STATUS_ERROR).end(error.message);
  }
  
};
module.exports = {
  getDogs,
};
