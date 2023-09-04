// import mongoose
import mongoose, { Schema } from "mongoose";
import { Person } from "../../interfaces";
// const mongoose = require("mongoose");
// import { Gender } from "../interfaces"
// define person schema
export const personSchema = new mongoose.Schema<Person>({
  name: {
    type: String,
    // required: true
  },
  age: Number,
  gender: String,
  belongs_to: [
    {
      type: Schema.Types.ObjectId,
      ref: "Groups",
      default: [],
    },
  ],
});
