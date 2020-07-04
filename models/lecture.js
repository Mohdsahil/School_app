var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const lectureSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      raequired: true,
      trim: true,
    },
    video: {
      type: String,
    },
    pdf: {
      type: String,
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

module.exports = mongoose.model("Lecture", lectureSchema);
