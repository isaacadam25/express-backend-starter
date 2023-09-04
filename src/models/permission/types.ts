import { Document } from 'mongoose';

export interface IPermission extends Document {
  generic_name: string;
  display_name: string;
  description: string;
}
