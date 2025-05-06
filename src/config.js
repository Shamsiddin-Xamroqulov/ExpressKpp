import path from "node:path";
import {config} from "dotenv";
config();

export const serverConfig = {
    PORT: process.env.PORT || 5000,
    dbPath: (fileName) => path.join(process.cwd(), "db", fileName) 
}