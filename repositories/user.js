import User from "../models/user.js";

class UserRepository {
  findUserByEmail = (email) => User.findOne({ email });

  createUser = (name, email, password) =>
    User.create({
      name,
      email,
      password,
    });

  findUserById = (userId) => User.findById(userId).select("-password");

  updateUser = (user, updates) => {
    user.name = updates.name || user.name;
    user.email = updates.email || user.email;

    if (updates.password) {
      user.password = updates.password;
    }

    return user.save();
  };
}

export default UserRepository;
