const { check } = require("express-validator");
const express = require("express");
var router = express.Router();

const {
  createteacher,
  createstudent,
  signin,
  signout,
  isSignin,
  isAuthenticated,
  isAdmin,
  signup,
} = require("../controllers/auth");
const { getUserById, getUser } = require("../controllers/user");
router.param("userId", getUserById);

// create teacher
router.post(
  "/newteacher/:userId",
  isSignin,
  isAuthenticated,
  isAdmin,
  createteacher
);
// create student
router.post(
  "/newstudent/:userId",
  isSignin,
  isAuthenticated,
  isAdmin,
  createstudent
);

router.post(
  "/singin",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 5 }),
  ],
  signin
);
router.get("/singout", signout);

router.post("/signup", signup);

module.exports = router;
