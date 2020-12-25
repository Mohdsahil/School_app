require("dotenv").config();
const { validationResult } = require("express-validator");
const Lecture = require("../models/lecture");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.getLectureById = (req, res, next, id) => {
  Lecture.findById(id)
    .populate("chapter")
    .populate("teacher")
    .exec((err, lecture) => {
      if (err) {
        return res.status(400).json({
          error: "lecture not found",
        });
      }
      req.lecture = lecture;
      next();
    });
};

exports.getLecture = (req, res) => {
  req.lecture.video = undefined;
  req.lecture.pdf = undefined;
  return res.json(req.lecture);
};

exports.getvideo = (req, res, next) => {
  if (req.lecture.video) {
    // return res.json("http://localhost:7000/videos/" + req.lecture.video);

    const path = __dirname + "/../uploads/videos/" + req.lecture.video;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  }
  next();
};

exports.getpdf = (req, res, next) => {
  if (req.lecture.pdf) {
    // res.set("Content-type", req.lecture.pdf.contentType);
    return res.json("http://localhost:7000/pdf/" + req.lecture.pdf);
  }
  next();
};
// create the lecture
exports.createLecture = (req, res) => {
  let data = req.body;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "NO files were uploaded. " });
  }
  let video = req.files.video;
  let pdf = req.files.pdf;

  video.name = Date.now() + "_" + video.name;
  pdf.name = Date.now() + "_" + pdf.name;

  video.mv("uploads/videos/" + video.name, function (err) {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "error to upload video, try again later" });
    }
  });
  video.mv("uploads/pdf/" + pdf.name, function (err) {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "error to upload pdf, try again later" });
    }
  });

  let lecture = new Lecture(data);

  lecture.video = video.name;
  lecture.pdf = pdf.name;
  lecture.teacher = req.profile._id;
  // save to DB
  lecture.save((err, lecture) => {
    if (err) {
      console.log("error", err);
      res.status(400).json({
        error: "Error to create Teachter try again later",
      });
    }
    res.json(lecture);
  });
};

exports.updateLecture = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with files",
      });
    }
    let lecture = req.lecture;
    lecture = _.extend(lecture, fields);

    if (file.video) {
      if (file.video.size > 500000000) {
        return res.status(400).json({
          error: "file is too big!! ",
        });
      }
      lecture.video.data = fs.readFileSync(file.video.path);
      lecture.video.contenttype = file.video.type;

      lecture.pdf.data = fs.readFileSync(file.pdf.path);
      lecture.pdf.contenttype = file.pdf.type;
    }

    lecture.save((err, lecture) => {
      if (err) {
        res.status(400).json({
          error: "Update faild",
        });
      }
      res.json(lecture);
    });
  });
};

exports.removeLecture = (req, res) => {
  let lecture = new Lecture(req.lecture);

  lecture.remove((err, deletedlectuer) => {
    if (err) {
      return res.status(400).json({ error: "Error to delete the lecture" });
    }
    fs.unlink("./uploads/videos/" + lecture.video, (err) => {
      if (err) {
        console.error(err);
      }

      //file removed
    });
    fs.unlink("./uploads/pdf/" + lecture.pdf, (err) => {
      if (err) {
        console.error(err);
      }

      //file removed
    });
    res.json(deletedlectuer);
  });
};

exports.lecturesByChapterId = (req, res) => {
  Lecture.find({ chapter: req.chapter._id })
    .select("-video")
    .populate("chapter", "_id name description")
    // .find({ _id: req.chapter._id })
    .populate("teacher", "_id name")
    .exec((err, chapters) => {
      if (err || !chapters) {
        return res.status(400).json({
          error: "no chapter found",
        });
      }
      res.json(chapters);
    });
};
