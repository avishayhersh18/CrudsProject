// imports
import mongoose from "mongoose";
import { groupSchema } from "./Groups";
import { personSchema } from "./Persons";

// exports
export const Groups = mongoose.model("Groups", groupSchema);
export const Peoples = mongoose.model("Peoples", personSchema);