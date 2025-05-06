import express from "express";
import {controlValidate} from "../middlewares/controlValidator.js"
import controlController from "../controllers/control.controller.js";
import {upload} from "../middlewares/multer.js";

const controlRouter = express.Router();

controlRouter.post("/create", upload.single("file"), controlValidate, controlController.controlPost);
controlRouter.delete("/delete/:controlId", controlController.controlDelete)
controlRouter.get("/", controlController.controlGet);

export default controlRouter