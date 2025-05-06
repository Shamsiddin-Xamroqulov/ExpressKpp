import { globalError } from "shokhijakhon-error-handler";
import { createToken } from "../utils/jwt.js";

class AuthController {
  constructor() {
    this.login = async function (req, res) {
        try {
          const { email, password } = req.body;
          const admins = await req.readFile("admin");

          const foundAdmin = admins.find((admin) => admin.email === email && admin.password === password);

          if (!foundAdmin) {
            return res.status(401).json({
              message: "Incorrect email or password!",
              status: 401,
            });
          }

          const userAgent = req.headers["user-agent"];

          const token = createToken({
            id: foundAdmin.id,
            browser: userAgent,
          });
      
          return res.status(200).json({
            message: "Successfully logged in!",
            token,
            status: 200,
          });
        } catch (error) {
          return globalError(error, res);
        }
      };
  }
}

export default new AuthController();
