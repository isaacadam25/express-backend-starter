import { Schema, model } from 'mongoose';
import { IRole } from '@/models/role/types';

const roleSchema: Schema = new Schema<IRole>({
  role_name: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Permission',
    },
  ],
  status: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const Role = model<IRole>('Role', roleSchema);

export default Role;
