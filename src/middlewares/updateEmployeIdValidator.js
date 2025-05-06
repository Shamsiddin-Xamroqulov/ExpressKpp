import { ClientError, globalError } from "shokhijakhon-error-handler"
import {createEmployeValidatorSchema} from "../utils/validatorSchema.js"

export const updateEmployeValidator = (req, res, next) => {
    try {
        let validatorSchema = createEmployeValidatorSchema(req.body) ;
        let validate = validatorSchema.validate(req.body) ;
        if(validate.error) throw new ClientError(validate.error.message, 400) ;
        return next();
    } catch (error) {
        return globalError(error, res)
    }
}