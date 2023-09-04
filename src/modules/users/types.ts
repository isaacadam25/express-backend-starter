// interface for user registration
export interface IUserPayload {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  email?: string;
  last_login?: string;
  password?: string;
  role: string;
}

// interface for user saving to database
export interface IUserBody {
  username: string;
  first_name: string;
  last_name: string;
  gender: string;
  phone_number: string;
  email?: string;
  password: string;
  role: string;
}
