export class UpdateOrderToPaid {
  constructor(id, status, update_time, email_address) {
    this.id = id;
    this.status = status;
    this.update_time = update_time;
    this.email_address = email_address;
  }
}
