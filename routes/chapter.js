const express = require("express");
var router = express.Router();

const {
  createChapter,
  updateChapter,
  deleteChapter,
  getChapter,
  getChapterByUserId,
  getchapterById,
  getSubjectChapter, // simply getChapter
} = require("../controllers/chapter");
const { getUserById, getUser } = require("../controllers/user");
const {
  isSignin,
  isAuthenticated,
  isTeacher,
  isAdmin,
} = require("../controllers/auth");

router.param("chapterId", getchapterById);
router.param("userId", getUserById);

//   create the chapter
router.post(
  "/chapter/create/:userId",
  isSignin,
  isAuthenticated,
  isTeacher,
  createChapter
);

//   get chapterby userId (get chapter who create the chapter)
router.get(
  "/chapter/:userId",
  isSignin,
  isAuthenticated,
  isTeacher,
  getChapterByUserId
);

router.get(
  "/chapter/:chapterId",
  isSignin,
  isAuthenticated,
  isTeacher,
  getChapter
);

//   update chapter
// router.put(
//   "/chapter/:chapterId/:userId",
//   isSignin,
//   isAuthenticated,
//   isTeacher,
//   updateChapter
// );

// delete the chapter
router.delete(
  "/chapter/:chapterId/:userId",
  isSignin,
  isAuthenticated,
  isTeacher,
  deleteChapter
);

// getchapterby subject and class
// here get the subject value by req.subject

router.get(
  "/chaptersubject/:subject/:userId",
  isSignin,
  isAuthenticated,
  getSubjectChapter
);

module.exports = router;
