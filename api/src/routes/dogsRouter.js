const { Router } = require("express");
const {
  createDogsHandler,
  getAllDogsHandler,
  getDogsApiHandler,
  getDogsIdHandler,
  getDogsDBHandler,
  getDogsNameHandler,
} = require("../handlers/dogsHandlers");

const dogsRouter = Router();

dogsRouter
  .get("/apiDogs", getDogsApiHandler)
  .get("/dogs", getAllDogsHandler)
  .get("/dogsDB", getDogsDBHandler)
  .get("/dog/:id", getDogsIdHandler)
  .get("/", getDogsNameHandler)
  .post("/", createDogsHandler);

module.exports = dogsRouter;
