import express from "express";
import employesController from "../controllers/employes.controller.js";
import { employeValidator } from "../middlewares/employeValidator.js";
import { checkEmployeId } from "../middlewares/checkEmployeId.js";
import { updateEmployeValidator } from "../middlewares/updateEmployeIdValidator.js";

const employeRouter = express.Router();

employeRouter.get('/', employesController.GET );
employeRouter.post('/create', employeValidator, employesController.POST );
employeRouter.put('/edit/:employeId', checkEmployeId, updateEmployeValidator, employesController.PUT );
employeRouter.delete('/delete/:employeId', checkEmployeId , employesController.DELETE );

export default employeRouter