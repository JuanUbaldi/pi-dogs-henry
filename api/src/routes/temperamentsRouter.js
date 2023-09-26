const { Router } = require("express");
const {
  saveTemperamentsHandler /* , giveMeAllTemperamentsHandler */,
} = require("../handlers/temperamentsHandlers.js");

const temperamentsRouter = Router();

temperamentsRouter.get("/all", saveTemperamentsHandler);
/* .get("/get",giveMeAllTemperamentsHandler) */

module.exports = temperamentsRouter;
