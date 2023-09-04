import { Document } from 'mongoose';
import { IPermission } from '@/models/permission/types';

export interface IRole extends Document {
  role_name: string;
  description: string;
  permissions: IPermission[];
  status?: boolean;
}
