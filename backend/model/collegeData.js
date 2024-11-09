import mongoose from "mongoose";

const collegeSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  fees: {
    type: [String], // Array of strings to store different fee values
    required: true,
  },
  number: {
    type: [String], // Array of strings to store phone numbers
    default: [],
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

const collegeData = mongoose.model("College", collegeSchema);

export default collegeData;
