const { Dog , Temperaments } = require("../db")

const STATUS_OK = 200;
const STATUS_ERROR = 404;

const postDog = async function(req, res){
  try {
    const {id, name, image, weight, height, life_span, temperament } = req.body;

    const existingDog = await Dog.findOne({
      where: {
        name: name
      }
    });

    if (existingDog) {
      return res.status(STATUS_ERROR).json({ error: 'El perro ya existe en la base de datos.' });
    }

    const newDog = await Dog.create({id, name, image, weight, height, life_span, temperament });


    const allTemperaments = await Temperaments.findAll();


    const selectedTemperaments = allTemperaments.filter(temp => temperament.includes(temp.name));


    await newDog.addTemperaments(selectedTemperaments);

    const tempsDog = (await newDog.getTemperaments()).map(element => element.name).join(", ")


    res.status(STATUS_OK).json({...newDog.dataValues, temperament : tempsDog });
  } catch (error) {
    res.status(STATUS_ERROR).json({ error: error.message });
  }
}

module.exports = {
    postDog
}