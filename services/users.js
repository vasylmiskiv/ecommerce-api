import User from "../models/user.js";

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  authUser = async ({ email, password }) => {
    const user = await this.findUserByEmail(email);

    if (user && (await user.matchPassword(password))) {
      return user;
    }

    return null;
  };

  createUser = ({ name, email, password }) => {
    return this.userRepository.createUser(name, email, password);
  };

  findUserById = (userId) => {
    return this.userRepository.findUserById(userId);
  };

  findUserByEmail = (email) => {
    return this.userRepository.findUserByEmail(email);
  };

  updateUserProfile = async (userProfileToUpdate) => {
    const user = await this.findUserById(userProfileToUpdate._id);

    if (!user) {
      throw new Error("User not found");
    }

    user.name = userProfileToUpdate.name;
    user.email = userProfileToUpdate.email;

    if (userProfileToUpdate.password) {
      user.password = userProfileToUpdate.password;
    }

    return this.userRepository.updateUserProfile(user);
  };

  updateUser = (userToUpdate) => {
    return this.userRepository.updateUser(userToUpdate);
  };

  deleteUser = (userId) => {
    const user = this.findUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return this.userRepository.deleteUser(userId);
  };

  getUsers = () => {
    return this.userRepository.getUsers();
  };
}

export default UserService;
