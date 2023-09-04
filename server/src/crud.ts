// import { PORT } from "./config";
import express from "express";

import mongoose from "mongoose";
import cors from "cors"; // Import the cors middleware
import { peopleRouter, groupRouter,commonRouter } from "./Routers";
import {mongo_uri, PORT} from './config'

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// define function for connect
// to the Data Base
export const connectToDb = async () => {
  try {
    if(mongo_uri){
      await mongoose.connect(mongo_uri);
      console.log("Connected to MongoDB");
    }
    else{throw new Error("fail")}
  } catch (error) {
    console.log("Error connecting to MongoDB:");
  }
};

// define function for using



// for activate the app
const main = async () => {
  await connectToDb();
  // indexes();
  app.use("/people", peopleRouter);
  app.use("/groups", groupRouter);
  app.use("/common", commonRouter);
  app.get("/", (req, res) => {
    res.sendStatus(200)
  })
  app.listen(PORT, () =>
    console.log(`Server is now listening on port ${PORT}`)
  );
};

// activate the app
main();