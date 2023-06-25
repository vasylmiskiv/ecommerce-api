import express from "express";
import UserRepository from "../repositories/user.js";
import UserService from "../services/users.js";
import UserController from "../controllers/users.js";
import { isUserAuthorized, isAdmin } from "../middleware/auth.js";

const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router
  .route("/")
  .post(userController.registerUser)
  .get(isUserAuthorized, isAdmin, userController.getUsers);
router.post("/login", userController.authUser);
router
  .route("/profile")
  .get(isUserAuthorized, userController.getUserProfile)
  .put(isUserAuthorized, userController.updateUserProfile);

router
  .route("/:id")
  .delete(isUserAuthorized, isAdmin, userController.deleteUser)
  .get(isUserAuthorized, isAdmin, userController.getUserById)
  .put(isUserAuthorized, isAdmin, userController.updateUser);

export default router;
