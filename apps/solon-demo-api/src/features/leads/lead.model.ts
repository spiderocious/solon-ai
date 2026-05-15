import mongoose, { type Document, Schema } from 'mongoose';

export interface ILead {
  leadId: string;
  sessionId?: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  party?: string;
  state?: string;
  skipped: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILeadDocument extends ILead, Document {}

const LeadSchema = new Schema<ILeadDocument>(
  {
    leadId: { type: String, required: true, unique: true, index: true },
    sessionId: { type: String, index: true },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    role: { type: String },
    party: { type: String },
    state: { type: String },
    skipped: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

export const LeadModel = mongoose.model<ILeadDocument>('Lead', LeadSchema);
