import express from "express"
import viewsController from "../controllers/views.controller.js"

const viewsRoutes = express.Router();

viewsRoutes.get("/", viewsController.home);
viewsRoutes.get("/login", viewsController.login);
viewsRoutes.get("/main", viewsController.main);
viewsRoutes.get("/back", viewsController.back);
viewsRoutes.get("/admin", viewsController.admin);
viewsRoutes.get("/createEmploye", viewsController.createEmploye);
viewsRoutes.get("/employes", viewsController.employes);
viewsRoutes.get("/employes/:id", viewsController.showEmploye);


export default viewsRoutes;