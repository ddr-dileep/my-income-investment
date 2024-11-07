import { model, Schema } from "mongoose";

const investmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
      min: 3,
    },
    category: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isInvestDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Investment = model("Investment", investmentSchema);
export default Investment;
