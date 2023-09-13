const { Router } = require("express");
const dogRouter = Router();
const { getDogs } = require("../controllers/getDogs");
const { getDogById } = require("../controllers/getDogById");
const { getDogByName } = require("../controllers/getDogByName.js");
const { postDog } = require("../controllers/postDog");

dogRouter.get("/dogs", getDogs);
dogRouter.get("/dogs/:id", getDogById);
dogRouter.get("/search", getDogByName);
dogRouter.post("/create", postDog);

module.exports = dogRouter;
