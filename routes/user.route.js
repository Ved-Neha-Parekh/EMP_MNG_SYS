import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { authorizedRoles, isAuthenticated } from "../middlewares/isAuth.js";

const userRouter = Router();

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.post(
  "/add-employee",
  isAuthenticated,
  authorizedRoles("admin", "manager"),
  userController.registerUser
);
userRouter.get("/employees", userController.employees);
userRouter.delete(
  "/delete-employee/:id",
  isAuthenticated,
  authorizedRoles("admin", "manager"),
  userController.deleteUser
);
userRouter.get("/employee/:id", isAuthenticated, userController.getSingleUser);
userRouter.put(
  "/update-employee/:id",
  authorizedRoles("admin", "manager"),
  isAuthenticated,
  userController.updateUser
);

export default userRouter;
