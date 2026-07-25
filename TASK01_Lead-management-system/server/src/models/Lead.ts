import mongoose, { Document, Schema, Types } from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message?: string;

  status:
    | "NEW"
    | "CONTACTED"
    | "QUALIFIED"
    | "PROPOSAL_SENT"
    | "WON"
    | "LOST";

  assignedTo?: Types.ObjectId;
  createdBy?: Types.ObjectId;
}

const LeadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
    },

    company: String,

    message: String,

    status: {
      type: String,
      enum: [
        "NEW",
        "CONTACTED",
        "QUALIFIED",
        "PROPOSAL_SENT",
        "WON",
        "LOST",
      ],
      default: "NEW",
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILead>("Lead", LeadSchema);