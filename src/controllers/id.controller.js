import {globalError} from "shokhijakhon-error-handler";

class IdController {
    constructor() {
        this.idController = async function(req, res) {
            try {
                const userId = Number(req.body.userId);
                let employeDb = await req.readFile("employes");
                let findUserId = employeDb.find((employe) => employe.userId === userId);
                
                if (!findUserId) {
                    return res.status(404).json({ message: "User ID not found!" });
                }

                return res.status(200).json({
                    message: "User ID successfully fetched!",
                    status: 200,
                    user: findUserId.id
                });
            
            } catch (err) {
                return globalError(err, res);
            }
        }
    }
}

export default new IdController()