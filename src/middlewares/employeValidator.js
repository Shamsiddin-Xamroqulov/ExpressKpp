import { ClientError, globalError } from "shokhijakhon-error-handler"
import {EmployeValidatorSchema} from "../utils/validatorSchema.js";

export const employeValidator = (req, res, next) => {
    try {
        let newEmploye = req.body;
        let validate = EmployeValidatorSchema.validate(newEmploye, {abortEarly : false});
        if (validate.error) throw new ClientError(validate.error.message, 400);
        return next();
    } catch (error) {
        return globalError(error, res)
    }
} 