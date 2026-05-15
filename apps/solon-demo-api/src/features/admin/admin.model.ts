import mongoose, { type Document, Schema } from 'mongoose';

export interface IAdmin {
  adminId: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAdminDocument extends IAdmin, Document {}

const AdminSchema = new Schema<IAdminDocument>(
  {
    adminId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
);

export const AdminModel = mongoose.model<IAdminDocument>('Admin', AdminSchema);
