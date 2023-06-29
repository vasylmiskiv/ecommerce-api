export class UpdateUserDto {
  constructor(id, name, email, password) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
