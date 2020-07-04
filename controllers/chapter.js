require("dotenv").config();
const { validationResult } = require("express-validator");
const User = require("../models/user");
const Chapter = require("../models/chapter");

// create chapter

exports.createChapter = (req, res) => {
  const { cls, subject, name, description } = req.body;
  console.log(req.body);
  if (!cls || !subject || !name || !description) {
    return res.status(400).json({
      error: "Please fill all  the fileds",
    });
  }

  let chapter = new Chapter(req.body);
  chapter.teacher = req.profile._id;

  chapter.save((err, chapter) => {
    if (err) {
      res.status(400).json({
        error: "Error to creating chapter",
      });
    }
    res.json(chapter);
  });
};

exports.getChapterByUserId = (req, res) => {
  Chapter.find({ teacher: req.profile._id }).exec((err, chapters) => {
    if (err) {
      return res.status(400).json({
        error: "No chapter by this user",
      });
    }
    res.json(chapters);
  });
};

// get chapter by chpterId

exports.getchapterById = (req, res, next, id) => {
  Chapter.findById(id)
    .populate("teacher")
    .exec((err, chapter) => {
      if (err || !chapter) {
        return res.status(400).json({
          error: "chapter not found",
        });
      }
      req.chapter = chapter;
      next();
    });
};

exports.getChapter = (req, res) => {
  res.json(req.chapter);
};

exports.deleteChapter = (req, res) => {
  let chapter = req.chapter;
  chapter.remove((err, deletedChapter) => {
    if (err) {
      return res.status(400).json({
        error: "failed to delte the chapter",
      });
    }
    res.json({
      message: "Chapter Delete3d successfuly",
      deletedChapter,
    });
  });
};

exports.getSubjectChapter = (req, res) => {
  Chapter.find({ cls: req.profile.cls, subject: req.params.subject })
    .populate("teacher")
    .exec((err, chapters) => {
      if (err) {
        res.status(400).json({
          error: "Error ot get chapter",
        });
      }
      res.json(chapters);
    });
};
