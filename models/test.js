var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const testSchema = new mongoose.Schema(
  {
    questions: [{ question, a, b, c, d, ans }],
    maxMaks: {
      type: Number,
      required: true,
    },
    testTime: {
      type: Date,
    },
    maxTime: {
      type: Number,
      default: 25,
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
  },

  { timestamps: true }
);

module.exports = mongoose.model("Text", testSchema);
