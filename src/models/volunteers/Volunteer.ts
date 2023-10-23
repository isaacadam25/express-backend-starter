import { Schema, model } from "mongoose";
import { IVolunteer } from "@/models/volunteers/types";

const volunteerSchema: Schema = new Schema<IVolunteer>({
  first_name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  last_name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  gender: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  phone_number: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: false,
    default: null,
  },
  status: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const Volunteer = model<IVolunteer>("Volunteer", volunteerSchema);

export default Volunteer;
