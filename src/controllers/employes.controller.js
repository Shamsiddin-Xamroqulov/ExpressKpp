import { globalError, ClientError } from "shokhijakhon-error-handler";
import { generateUserId } from "../middlewares/createUserId.js";
import { addTime, addUpdateTime } from "../middlewares/addTime.js";
import {verifyToken} from "../utils/jwt.js"

class EmployesController {
    constructor() {
        this.GET = async function (req, res) {
            try {
                const token = req.headers.token;

                if (!token) {
                    return res.status(403).json({ message: "Access denied. No token provided.", status: 403 });
                }

                const decoded = verifyToken(token);

                if (decoded.id !== 1) {
                    return res.status(403).json({ message: "Access denied. Only admins can create employees.", status: 403 });
                }
                let employes = await req.readFile("employes");
                return res.status(200).json(employes);
            } catch (error) {
                return globalError(error, res)
            }
        },
        this.POST = async function (req, res) {
            try {
                const token = req.headers.token;

                if (!token) {
                    return res.status(403).json({ message: "Access denied. No token provided.", status: 403 });
                }

                const decoded = verifyToken(token);

                if (decoded.id !== 1) {
                    return res.status(403).json({ message: "Access denied. Only admins can create employees.", status: 403 });
                }

                let employes = await req.readFile("employes");
                let newEmploye = req.body;

                let checkEmail = employes.some((item) => item.email == newEmploye.email);
                let checkPhone = employes.some((item) => item.phone == newEmploye.phone);

                if (!(checkEmail || checkPhone)) {
                    newEmploye.id = employes.length ? employes.at(-1).id + 1 : 1;
                    newEmploye.userId = generateUserId();
                    newEmploye.createdAt = addTime();

                    employes.push(newEmploye);

                    await req.writeFile("employes", employes);

                return res.status(201).json({ message: "Employee successfully created", status: 201 });
                } else {
                 throw new ClientError("Employee already exists", 400);
                }
        } catch (error) {
            return globalError(error, res);
        }
    },
        this.PUT = async function (req, res) {
            try {
                const token = req.headers.token;
            
                if (!token) {
                    throw new ClientError("Access denied. No token provided.", 403);
                }

                const decoded = verifyToken(token);
                if (decoded.id !== 1) {
                    throw new ClientError("Access denied. Only admins can update employees.", 403)
                }
                let employes = await req.readFile("employes");
                let { employeId } = req.params;
                let newEmploye = req.body;
            
                let idx = employes.findIndex(({ id }) => id == employeId);
                if (idx === -1) {
                    throw new ClientError("Employe not found", 404);
                }
            
                let isDuplicate = employes.some((item, i) => {
                    if (i === idx) return false;
                    return item.email === newEmploye.email || item.phone === newEmploye.phone;
                });
            
                if (isDuplicate) {
                    throw new ClientError("Email or phone already exists", 400);
                }
            
                employes[idx] = {
                    ...employes[idx],
                    ...newEmploye,
                    updateAt: addUpdateTime()
                };
            
                await req.writeFile("employes", employes);
            
                return res.status(200).json({ message: "Employee successfully updated", status: 200 });
            } catch (error) {
                return globalError(error, res);
            }
        },
        this.DELETE = async function (req, res) {
            try {
                const token = req.headers.token;
            
                if (!token) {
                    return res.status(403).json({ message: "Access denied. No token provided.", status: 403 });
                }

                const decoded = verifyToken(token);

                if (decoded.id !== 1) {
                    return res.status(403).json({ message: "Access denied. Only admins can delete employees.", status: 403 });
                }
                let employes = await req.readFile("employes");
                let idx = employes.findIndex(({ id }) => id == req.params.employeId);
            
                if (idx === -1) {
                    throw new ClientError("Employe not found", 404);
                }
            
                employes.splice(idx, 1);
                await req.writeFile("employes", employes);
            
                return res.status(200).json({ message: "Employe successfully deleted", status: 200 });
            
            } catch (error) {
                return globalError(error, res);
            }
        }
    }
};

export default new EmployesController();