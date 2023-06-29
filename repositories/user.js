import User from "../models/user.js";

class UserRepository {
  findUserByEmail = (email) => User.findOne({ email });

  findUserById = (userId) => User.findById(userId).select("-password");

  findUserProfileById = (userId) => User.findById(userId);

  createUser = (name, email, password) => {
    return User.create({
      name,
      email,
      password,
    });
  };

  updateUser = async (userToUpdate) =>
    User.findByIdAndUpdate(userToUpdate._id, userToUpdate, {
      new: true,
    });

  deleteUser = (userId) => {
    User.findByIdAndRemove(userId);
  };

  getUsers = () => User.find({});
}

export default UserRepository;
