import bcrypt from "bcrypt";

const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Katty",
    email: "katty@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "David",
    email: "david@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
