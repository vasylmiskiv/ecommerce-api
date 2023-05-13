import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { isUserAuthorized, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(isUserAuthorized, isAdmin, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(isUserAuthorized, getUserProfile)
  .put(isUserAuthorized, updateUserProfile);

router
  .route("/:id")
  .delete(isUserAuthorized, isAdmin, deleteUser)
  .get(isUserAuthorized, isAdmin, getUserById)
  .put(isUserAuthorized, isAdmin, updateUser);

export default router;
