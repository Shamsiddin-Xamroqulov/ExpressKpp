import fs from "fs/promises";
import path from "path";
import {serverConfig} from "../config.js";
const {dbPath} = serverConfig;

const model = (req, res, next) => {
    req.readFile = async (fileName) => {
        let readFile = await fs.readFile(dbPath(fileName + ".json"), "utf-8");
        return readFile ? JSON.parse(readFile) : readFile;
    };
    req.writeFile = async (fileName, data) => {
        await fs.writeFile(path.join(process.cwd(), "db", fileName + ".json"), JSON.stringify(data, null, 4));
        return true
    }
    next();
}

export default model;