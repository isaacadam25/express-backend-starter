import { Document } from "mongoose";

export interface IVolunteer extends Document {
  first_name: string;
  last_name: string;
  gender: string;
  phone_number: string;
  email?: string;
  status?: boolean;
}
