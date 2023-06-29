import User from "../models/user.js";

class UserRepository {
  findUserByEmail = (email) => User.findOne({ email });

  findUserById = (userId) => User.findById(userId).select("-password");

  findUserProfileById = (userId) => User.findById(userId);

  createUser = (name, email, password) =>
    User.create({
      name,
      email,
      password,
    });

  updateUserProfile = (user) => user.save();

  updateUser = (userToUpdate) =>
    User.findByIdAndUpdate(userToUpdate._id, userToUpdate, {
      new: true,
    });

  deleteUser = (userId) => User.findByIdAndDelete(userId);

  getUsers = () => User.find({});
}

export default UserRepository;
