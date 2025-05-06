import express from "express";
import path from "path";
import {config} from "dotenv";
config();
import {serverConfig} from "./config.js"
const {PORT} = serverConfig;
import model from"./model/model.js";
import mainRoutes from"./routes/main.routes.js"
import viewsRoutes from"./routes/views.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(model);
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));

app.use(express.static(path.join(process.cwd(), "public")))

app.use(viewsRoutes);
app.use("/api", mainRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}-port`);
}) 