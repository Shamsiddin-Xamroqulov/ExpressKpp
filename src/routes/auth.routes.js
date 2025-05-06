import express from "express";
import authController from "../controllers/auth.controller.js"
import {adminValidator} from "../middlewares/adminValidator.js"

const authRouter = express.Router();

authRouter.post("/login", adminValidator, authController.login);

export default authRouter;