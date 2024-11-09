import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import collegeRouter from "./route/college.route.js";
import cors from "cors";
const app = express();

app.use(express.json());

app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 4000;

//connect to mongodb
// const mongoose = require("mongoose");
// mongoose.connect(
//   "mongodb+srv://abhi:<abhi@db>@testdb.vcyi0.mongodb.net/?retryWrites=true&w=majority&appName=testdb"
// );
const URI = process.env.MongoDBURI;
try {
  mongoose.connect(
    "mongodb+srv://abhi:abhi%40db@testdb.vcyi0.mongodb.net/?retryWrites=true&w=majority&appName=testdb"
  );
  console.log("Connected to mongoDB");
} catch (error) {
  console.log("Error:", error);
}

//defing routes
app.use("/college", collegeRouter);

app.listen(PORT, () => {
  console.log(`Server app listening on port ${PORT}`);
});
