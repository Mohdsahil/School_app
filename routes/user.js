const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  getAllTeachers,
  getAllStudents,
  photo,
} = require("../controllers/user");
const { isSignin, isAuthenticated, isAdmin } = require("../controllers/auth");
router.param("userId", getUserById);

router.get("/user/:userId", isSignin, getUser);

// get all teachers
router.get(
  "/user/teacher/:userId",
  isSignin,
  isAuthenticated,
  isAdmin,
  getAllTeachers
);
// get all students
router.get(
  "/user/students/:userId",
  isSignin,
  isAuthenticated,
  isAdmin,
  getAllStudents
);

router.get("/user/photo/:userId", photo);

// delete a user
// router.delete("/user/:userId", is)

module.exports = router;
