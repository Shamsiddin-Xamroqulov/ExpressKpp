import { globalError } from "shokhijakhon-error-handler";

class ViewsController {
    constructor() {
        this.home = async (req, res) => {
            try {
                return res.render("home");
            } catch (err) {
                return globalError(err, res);
            }
        }
        this.login = async (req, res) => {
            try {
                return res.render("login");
            } catch (err) {
                return globalError(err, res);
            }
        }
        this.main = async (req, res) => {
            try {
                return res.render("main");
            } catch (err) {
                return globalError(err, res);
            }
        }
        this.back = async (req, res) => {
            try {
                return res.render("back");
            } catch (err) {
                return globalError(err, res);
            }
        }
        this.admin = async (req, res) => {
            try {
                return res.render("admin");
            } catch (err) {
                return globalError(err, res);
            }
        }
        this.createEmploye = async (req, res) => {
            try {
                return res.render("createEmploye");
            } catch (err) {
                return globalError(err, res);
            }
        }
        this.employes = async (req, res) => {
            let data = await req.readFile("employes")
            try {
                return res.render("employes", {data : data});
            } catch (err) {
                return globalError(err, res);
            }
        }
        this.showEmploye = async (req, res) => {
            try {
                const empId = Number(req.params.id);
            
                let employes = await req.readFile("employes");
                let controls = await req.readFile("controls");
            
                let employe = employes.find(emp => emp.id === empId);
                if (!employe) {
                    return res.status(404).send("Xodim topilmadi");
                }
            
                let logs = controls.filter(c => c.empId === empId);
            
                return res.render("employeDetail", { employe, logs });
            } catch (err) {
                return globalError(err, res);
            }
        };        
    }
}

export default new ViewsController();