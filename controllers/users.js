import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/user.js";

import { AuthUserDto } from "../dto/AuthUser.dto.js";
import { RegisterUserDto } from "../dto/RegisterUser.dto.js";
import { UpdateUserDto } from "../dto/UpdateUser.dto.js";

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const authUserDto = new AuthUserDto(email, password);

    const user = await this.userService.authUser(authUserDto);

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  });

  registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const registerUserDto = new RegisterUserDto(name, email, password);

    const userExists = await this.userService.findUserByEmail(email);

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await this.userService.createUser(registerUserDto);

    if (user) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: generateToken(newUser._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  });

  getUserProfile = asyncHandler(async (req, res) => {
    const user = await this.userService.findUserById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });

  updateUserProfile = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const updateUserDto = new UpdateUserDto(name, email, password);

    const user = await this.userService.findUserById(req.body._id);

    if (user) {
      const updatedUser = await this.userService.updateUser(
        user,
        updateUserDto
      );

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });

  getUsers = asyncHandler(async (req, res) => {
    const users = await this.userService.getUsers();

    res.json(users);
  });

  deleteUser = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;

    const user = await this.userService.findUserById(userId);

    if (user) {
      user.remove();
      res.json({ message: `User ${userId} has been removed` });
    } else {
      res.status(404);
    }
  });

  getUserById = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
      res.json(user);
    } else {
      res.status(404);
    }
  });

  updateUser = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;

    const user = await this.userService.findUserById(userId);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });
}

export default UserController;
