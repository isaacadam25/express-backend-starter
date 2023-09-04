export interface IUserLoginPayload {
  phoneNumber: string;
  password: string;
}

export interface IChangePassword {
  password: string;
  new_password: string;
  confirm_password: string;
}
