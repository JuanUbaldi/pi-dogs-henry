const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Op } = require("sequelize");

const createDog = async (
  name,
  image,
  min_height,
  max_height,
  min_weight,
  max_weight,
  min_lifeSpan,
  max_lifeSpan,
  temperaments
) => {
  const existingDog = await Dog.findOne({
    where: { name },
  });

  if (existingDog) {
    return "El perro ya existe ";
  }
 

  const newDog = await Dog.create({
    name,
    image,
    min_height,
    max_height,
    min_weight,
    max_weight,
    min_lifeSpan,
    max_lifeSpan,
  });



  const temperamentDb = await Temperament.findAll({
    where: {
      name: temperaments,
    },
  });
  await newDog.addTemperaments(temperamentDb);

  const dogId = newDog.Id;
  console.log(dogId);
  const doggy = {
    isCreated: newDog.isCreated,
    id: dogId,
    name: `${name}`,
    image: `${image}`,
    height: `${min_height} - ${max_height}`,
    weight: `${min_weight} - ${max_weight}`,
    life_span: `${min_lifeSpan} - ${max_lifeSpan} years`,
    temperaments: temperaments,
  };
  console.log(doggy);

  return doggy;
};

//funcion para requerir los dogs de la api
const getDogApi = async () => {
  const apiDog = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
  );

  const dogs = apiDog.data.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      image: dog.image.url,
      height: dog.height.imperial,
      weight: dog.weight.imperial,
      years: dog.life_span,
      temperament: dog.temperament,
    };
  });

  return dogs;
};

//funcion para requerir los dogs de la base de datos
const getDogDB = async () => {
  const allDogs = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  console.log(allDogs);
  const dogsWithTemperaments = allDogs.map((dog) => {
    const temperaments = dog.Temperaments.map((temp) => temp.name);
    return { ...dog.toJSON(), temperaments };
  });

  console.log(dogsWithTemperaments);

  const AllDogsDB = dogsWithTemperaments.map((dog) => {
    const {
      isCreated,
      Id,
      name,
      image,
      min_height,
      max_height,
      min_weight,
      max_weight,
      min_lifeSpan,
      max_lifeSpan,
    } = dog;
    console.log(dog.temperaments);
    return {
      isCreated: isCreated,
      id: Id,
      name: name,
      image: image,
      height: `${min_height} - ${max_height}`,
      weight: `${min_weight} - ${max_weight}`,
      years: `${min_lifeSpan} - ${max_lifeSpan} years`,
      temperament: dog.temperaments.join(", "),
    };
  });

  return AllDogsDB;
};

//funcion para hacer le detail por id
const getDogById = async (id) => {
  const dogsDB = await getDogDB();
  const dogsApi = await getDogApi();

  const AllDogs = [...dogsDB, ...dogsApi];
  const dog = AllDogs.find((ele) => ele.id == id);
  if (dog) return dog;
  if (!dog) return `The dog with the ID:${id} was not found`;
};

//funcion para mostrar las cards de todos los dogs
const getAllDogs = async () => {
  const dogsDB = await getDogDB();
  const dogsApi = await getDogApi();
  const AllDogs = [...dogsDB, ...dogsApi];

  return AllDogs;
};

//funcion de busqueda por nombre para la searchbar
const getDogByName = async (name) => {
  const dogsDB = await getDogDB();
  const dogsApi = await getDogApi();
  const AllDogs = [...dogsDB, ...dogsApi];

  if (name) {
    const filterDogs = AllDogs.filter((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase())
    );

    if (!filterDogs.length)
      throw new Error(`The dog with the name:${name} was not found `);
    return filterDogs;
  }
  return AllDogs;
};

const deleteDog = async (id) => {
  if (isNaN(id)) {
    await Dog.destroy({
      where: { id },
    });
  }
  return `no se puede eliminar el dog con el id : ${id} ya que pertenece a la api`;
};

module.exports = {
  createDog,
  getAllDogs,
  getDogDB,
  getDogApi,
  getDogById,
  getDogByName,
  deleteDog,
};
