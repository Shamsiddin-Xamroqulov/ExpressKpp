import {ClientError, globalError} from "shokhijakhon-error-handler";
import {adminValidatorSchema} from "../utils/validatorSchema.js"

export const adminValidator = (req, res, next) => {
    try {
        let newAdmin = req.body;
        let validate = adminValidatorSchema.validate(newAdmin, {abortEarly : false});
        if (validate.error) throw new ClientError(validate.error.message, 400);
        return next();
    } catch (error) {
        return globalError(error, res)
    }
} 