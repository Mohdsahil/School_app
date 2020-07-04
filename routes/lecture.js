const express = require("express");
var router = express.Router();
const fileUpload = require("express-fileupload");

router.use(fileUpload());

const {
  getLectureById,
  createLecture,
  updateLecture,
  removeLecture,
  lecturesByChapterId,
  getLecture,
  getvideo,
  getpdf,
} = require("../controllers/lecture");
const { getchapterById } = require("../controllers/chapter");
const { getUserById, getUser } = require("../controllers/user");
const {
  isSignin,
  isAuthenticated,
  isTeacher,
  isAdmin,
} = require("../controllers/auth");

router.param("chapterId", getchapterById);
router.param("lectureId", getLectureById);
router.param("userId", getUserById);

// create lecture
router.post(
  "/lecture/create/:userId",
  isSignin,
  isAuthenticated,
  isTeacher,
  createLecture
);

router.delete(
  "/lecture/:lectureId/:userId",
  isSignin,
  isAuthenticated,
  isTeacher,
  removeLecture
);
// get lecture
router.get("/lecture/:lectureId", getLecture);
// get lecture video and pdf
router.get("/lecture/video/:lectureId", getvideo);
router.get("/lecture/pdf/:lectureId", getpdf);

// update the lecture
router.put(
  "/lecture/:lectureId/:userId",
  isSignin,
  isAuthenticated,
  isTeacher,
  updateLecture
);

// get lectures by chapter id

router.get(
  "/lectures/:chapterId/:userId",
  isSignin,
  isAuthenticated,
  lecturesByChapterId
);

module.exports = router;
