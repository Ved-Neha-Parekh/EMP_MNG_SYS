import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { authorizedRoles, isAuthenticated } from "../middlewares/isAuth.js";

const userRouter = Router();

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/employees", userController.employees);
userRouter.delete("/delete-employee/:id",isAuthenticated,userController.deleteUser);
// userRouter.post(
//   "/add-employee",
//   isAuthenticated,
//   authorizedRoles("admin", "manager"),
//   userController.registerUser
// );

export default userRouter;
