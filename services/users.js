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

  updateUser = (user, updates) => {
    return this.userRepository.updateUser(user, updates);
  };

  getUsers = () => {
    return this.userRepository.getUsers();
  };
}

export default UserService;
