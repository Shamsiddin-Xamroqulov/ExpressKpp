import { ClientError, globalError } from "shokhijakhon-error-handler"
import {deleteIdValidatorSchema} from "../utils/validatorSchema.js"

export const deleteIdValidator = (req, res, next) => {
    try {
        let validatorSchema = deleteIdValidatorSchema(req.body) ;
        let validate = validatorSchema.validate(req.body) ;
        if(validate.error) throw new ClientError(validate.error.message, 400) ;
        return next();
    } catch (error) {
        return globalError(error, res)
    }
}