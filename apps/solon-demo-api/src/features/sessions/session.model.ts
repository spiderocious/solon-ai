import mongoose, { type Document, Schema } from 'mongoose';

export interface ISession {
  sessionId: string;
  leadId?: string;
  pageTrail: string[];
  userAgent?: string;
  ipHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISessionDocument extends ISession, Document {}

const SessionSchema = new Schema<ISessionDocument>(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    leadId: { type: String, index: true },
    pageTrail: { type: [String], default: [] },
    userAgent: { type: String },
    ipHash: { type: String },
  },
  { timestamps: true },
);

export const SessionModel = mongoose.model<ISessionDocument>('Session', SessionSchema);
