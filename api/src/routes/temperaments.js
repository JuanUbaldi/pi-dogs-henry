const { Router } = require("express")
const temperamentRoute = Router()
const { getTemperaments } = require("../controllers/getTemperaments")

temperamentRoute.get("/temperaments", getTemperaments);

module.exports = temperamentRoute;
