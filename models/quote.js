import mongoose, { Schema, model, models } from "mongoose";

const QuoteSchema = new Schema({
  creator: { type: mongoose.Schema.Types.ObjectId },
  // creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quote: { type: String, required: [true, "Quote is Required"] },
  author: { type: String, required: [true, "Author is Required"] },
});

const Quote = models.Quote || model("Quote", QuoteSchema);

export default Quote;
