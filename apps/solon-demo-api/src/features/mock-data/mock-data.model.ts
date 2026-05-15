import mongoose, { type Document, Schema } from 'mongoose';

export interface IMockData {
  key: string;
  label: string;
  editable: boolean;
  data: unknown;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMockDataDocument extends IMockData, Document {}

const MockDataSchema = new Schema<IMockDataDocument>(
  {
    key: { type: String, required: true, unique: true, index: true },
    label: { type: String, required: true },
    editable: { type: Boolean, required: true, default: false },
    data: { type: Schema.Types.Mixed, required: true },
    updatedBy: { type: String },
  },
  { timestamps: true, collection: 'mockdatas' },
);

export const MockDataModel = mongoose.model<IMockDataDocument>('MockData', MockDataSchema);
