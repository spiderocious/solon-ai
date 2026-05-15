import mongoose, { type Document, Schema } from 'mongoose';

export interface IFeedback {
  feedbackId: string;
  sessionId?: string;
  rating?: number;
  comment?: string;
  page?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFeedbackDocument extends IFeedback, Document {}

const FeedbackSchema = new Schema<IFeedbackDocument>(
  {
    feedbackId: { type: String, required: true, unique: true, index: true },
    sessionId: { type: String, index: true },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String, maxlength: 2000 },
    page: { type: String },
  },
  { timestamps: true },
);

export const FeedbackModel = mongoose.model<IFeedbackDocument>('Feedback', FeedbackSchema);
