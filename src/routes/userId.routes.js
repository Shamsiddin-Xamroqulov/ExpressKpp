import express from "express";
import idController from "../controllers/id.controller.js";
import {userIdValidator} from "../middlewares/userIdValidator.js"

const idRouter = express.Router();

idRouter.post("/", userIdValidator, idController.idController);

export default idRouter