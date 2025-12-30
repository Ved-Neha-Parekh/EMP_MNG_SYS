import { Router } from "express";
import { clientController } from "../controllers/client.controller.js";
import { requireAuth } from "../middlewares/clientAuth.js";

const clientRouter = Router();

clientRouter.get("/sign-up",clientController.signUpPage);
clientRouter.post("/sign-up",clientController.handelSignUp);
clientRouter.get("/login",clientController.loginPage);
clientRouter.post("/login",clientController.handelLogin);

clientRouter.get("/",requireAuth,clientController.viewDashboard);

// clientRouter.get("/add-employee",clientController.addEmployeePage);
clientRouter.get("/view-employees",requireAuth,clientController.renderViewEmployees);

clientRouter.get("/delete-employee/:id",clientController.deleteEmployee);

clientRouter.get("/logout", clientController.logout);
export default clientRouter;