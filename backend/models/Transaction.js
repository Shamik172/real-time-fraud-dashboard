import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },


    amount: {
      type: Number,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    device: {
      type: String,
      required: true
    },

    riskScore: {
      type: Number,
      required: true
    },

    riskLevel: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      required: true
    },

    reasons: {
      type: [String],
      default: []
    },

    timestamp: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Transaction", transactionSchema);
