const URL = "https://rickandmortyapi.com/api/character/";
const axios = require("axios");

const getDogById = async function (req, res) {
  try {
    const { id } = req.params;

    const resultDogs = await axios.get(`${URL}`)
    const allDogs = resultDogs.data;
    const dogsMap = []
    allDogs.forEach(dog => {
      const newDog = {
        id: dog.id,
        name: dog.name,
        weight: dog.weight.imperial,
        height: dog.height.imperial,
        life_span: dog.life_span,
        image: dog.image.url,
        temperament : dog.temperament,
      }
      dogsMap.push(newDog);
    });

    const dogsApi = dogsMap.find(dog => dog.id === Number(id));
    let resDb;

    if (!dogsApi) {
      const dogDb = await Dog.findByPk(id, {
        include: [{
          model: Temperaments,
          attributes: ['name'],
          through: {
            attributes: [],
          }
        }]
      });

      if (dogDb) {
        resDb = {
          id: dogDb.id,
          name: dogDb.name,
          weight: dogDb.weight,
          height: dogDb.height,
          life_span: dogDb.life_span,
          image: dogDb.image,
          temperament: dogDb.Temperaments.map((temp) => temp.name).join(', '),
        };
      }
    }

    res.status(200).json(dogsApi || resDb);
  } catch (error) {
    res.status(STATUS_ERROR).end(error.message);
  }
};

module.exports = {
  getDogById,
};
