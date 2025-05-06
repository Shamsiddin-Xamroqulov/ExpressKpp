import express from "express";
import employeRouter from "../routes/employes.routes.js"
import authRouter from "../routes/auth.routes.js"
import userIdRouter from "./userId.routes.js"
import controlRouter from "../routes/control.routes.js"

const mainRoutes = express.Router();


mainRoutes.use("/auth", authRouter)
mainRoutes.use("/employes", employeRouter);
mainRoutes.use("/userId", userIdRouter);
mainRoutes.use("/controls", controlRouter);

export default mainRoutes;