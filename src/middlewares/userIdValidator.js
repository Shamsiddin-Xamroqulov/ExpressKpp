import { ClientError, globalError } from "shokhijakhon-error-handler"
import {userIdValid} from "../utils/validatorSchema.js"

export const userIdValidator = (req, res, next) => {
    try {
        let validatorSchema = userIdValid.validate(req.body);
        if(validatorSchema.error) throw new ClientError(validatorSchema.error.message, 400);
        return next();
    } catch (error) {
        return globalError(error, res)
    }
}