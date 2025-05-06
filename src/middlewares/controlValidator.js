import { ClientError, globalError } from "shokhijakhon-error-handler"
import {controlValidator} from "../utils/validatorSchema.js";

export const controlValidate = (req, res, next) => {
    try {
        let newControl = req.body;
        let validate = controlValidator.validate(newControl, {abortEarly : false});
        if (validate.error) throw new ClientError(validate.error.message, 400);
        return next();
    } catch (error) {
        return globalError(error, res)
    }
} 