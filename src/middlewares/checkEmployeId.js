import { ClientError, globalError } from "shokhijakhon-error-handler";

export const checkEmployeId = async (req, res, next) => {
    try {
        let employes = await req.readFile("employes");
        if (!(employes.some(({ id }) => id == req.params.employeId))) throw new ClientError("Employe is not found", 404)
        return next();
    } catch (error) {
        return globalError(error, res)
    }
}