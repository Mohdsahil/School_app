var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var chapterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      raequired: true,
      trim: true,
    },
    cls: {
      type: Number,
      required: true,
    },
    streme: {
      type: String,

      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
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

module.exports = mongoose.model("Chapter", chapterSchema);
