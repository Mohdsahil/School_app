var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const restresultSchema = new mongoose.Schema(
  {
    marks: {
      type: Number,
      default: 0,
    },
    chapter: {
      // id of the chapter for which this lecture belongs
      type: ObjectId,
      ref: "Chapter",
      required: true,
    },
    teacher: {
      // id of the teacher who create this chapter
      type: ObjectId,
      ref: "User",
      required: true,
    },
    sudent: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TestResult", restresultSchema);
