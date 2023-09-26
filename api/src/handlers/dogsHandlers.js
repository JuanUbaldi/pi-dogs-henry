const {
  createDog,
  getDogById,
  getDogByName,
  deleteDog,
  getDogApi,
  getAllDogs,
  getDogDB,
} = require("../controllers/dogsControllers");

const createDogsHandler = async (req, res) => {
  const {
    name,
    image,
    min_height,
    max_height,
    min_weight,
    max_weight,
    min_lifeSpan,
    max_lifeSpan,
    temperaments,
  } = req.body;

  try {
    const response = await createDog(
      name,
      image,
      min_height,
      max_height,
      min_weight,
      max_weight,
      min_lifeSpan,
      max_lifeSpan,
      temperaments
    );
    res.status(200).json(response);
  } catch (error) {
    console.log({ error: error.message });
    res.status(400).json({ error: error.message });
  }
};

const getDogsApiHandler = async (req, res) => {
  try {
    const response = await getDogApi();
    res.status(200).json(response);
  } catch (error) {
    console.log({ error: error.message });
    res.status(400).json({ error: error.message });
  }
};

const getAllDogsHandler = async (req, res) => {
  try {
    const response = await getAllDogs();
    res.status(200).json(response);
  } catch (error) {
    console.log({ error: error.message });
    res.status(400).json({ error: error.message });
  }
};

const getDogsDBHandler = async (req, res) => {
  try {
    const responseDB = await getDogDB();
    res.status(200).json(responseDB);
    console.log(responseDB);
  } catch (error) {
    console.log({ error: error.message });
    res.status(400).json({ error: error.message });
  }
};

const getDogsIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getDogById(id);

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getDogsNameHandler = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const response = await getDogByName(name);
      console.log(response);
      return res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDogsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteDog();
    res.status(200).send(`The dog with the id: ${id} was correctly deleted `);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createDogsHandler,
  getDogsApiHandler,
  getAllDogsHandler,
  getDogsDBHandler,
  getDogsIdHandler,
  getDogsNameHandler,
  deleteDogsHandler,
};
