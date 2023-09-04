// import mongoose
import mongoose, { Schema } from "mongoose";

// export group schema
export const groupSchema = new mongoose.Schema({
  name: String,
  peoples: [
    {
      type: Schema.Types.ObjectId,
      ref: "Peoples",
    },
  ],
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Groups",
    },
  ],
  have_father: Boolean,
});
