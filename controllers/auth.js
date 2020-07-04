require("dotenv").config();
const { validationResult } = require("express-validator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

// create the teachter
exports.createteacher = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    // destructuring the  fields
    const {
      name,
      fatherName,
      phone,
      email,
      gender,
      desingn,
      role,
      password,
    } = fields;

    if (
      !name ||
      !fatherName ||
      !phone ||
      !email ||
      !gender ||
      !desingn ||
      !role ||
      !password
    ) {
      if (!name) {
        return res.status(400).json({
          error: "name not be empty",
        });
      }
      if (!fatherName) {
        return res.status(400).json({
          error: "fatherName not be empty",
        });
      }
      if (!phone) {
        return res.status(400).json({
          error: "phone not be empty",
        });
      }
      if (!email) {
        return res.status(400).json({
          error: "email not be empty",
        });
      }
      if (!gender) {
        return res.status(400).json({
          error: "gender not be empty",
        });
      }
      if (!desingn) {
        return res.status(400).json({
          error: "desingn not be empty",
        });
      }
      if (!role) {
        return res.status(400).json({
          error: "role not be empty",
        });
      }
      if (!password) {
        return res.status(400).json({
          error: "password not be empty",
        });
      }
    }

    let teacher = new User(fields);

    // handeling file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size is to big!!",
        });
      }
      teacher.photo.data = fs.readFileSync(file.photo.path);
      teacher.photo.contenttype = file.photo.type;
    }

    // save to DB
    teacher.save((err, teacher) => {
      if (err) {
        res.status(400).json({
          error: "Error to create Teachter try again later",
        });
      }
      res.json(teacher);
    });
  });
};

exports.createstudent = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    // destructuring the fields
    const {
      name,
      fatherName,
      phone,
      email,
      gender,
      cls,

      password,
    } = fields;

    if (
      !name ||
      !fatherName ||
      !phone ||
      !email ||
      !gender ||
      !cls ||
      !password
    ) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let student = new User(fields);

    // handeling file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size is to big!!",
        });
      }
      student.photo.data = fs.readFileSync(file.photo.path);
      student.photo.contenttype = file.photo.type;
    }

    // save to DB
    student.save((err, student) => {
      if (err) {
        res.status(400).json({
          error: "Error to create student try again later",
        });
      }
      res.json(student);
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Email does't exist",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password does't exist",
      });
    }

    // create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // Put token in cookie
    res.cookie("token", token, { expire: new Date() + 999 });
    // send response to frontend
    const { _id, name, fatherName, cls, phone, email, role } = user;
    return res.json({
      token,
      user: {
        _id,
        name,
        fatherName,
        cls,
        email,
        phone,
        email,

        role,
      },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "signout Successfuly",
  });
};

// protect routes

exports.isSignin = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

// custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED!",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role != 5) {
    return res.status(403).json({
      error: "Your are not Admin",
    });
  }
  next();
};

exports.isTeacher = (req, res, next) => {
  if (req.profile.role < 1) {
    return res.status(403).json({
      error: "Your are not Teacher",
    });
  }
  next();
};

// signup
exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save user in DB",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};
