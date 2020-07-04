const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.photo = undefined;
  req.profile.enc_password = undefined;
  req.profile.createAt = undefined;
  req.profile.updateAt = undefined;
  return res.json(req.profile);
};

exports.photo = (req, res) => {
  if (req.profile.photo.data) {
    res.set("Content-type", req.profile.photo.contentType);
    return res.send(req.profile.photo.data);
  }
};

// getAllTeachers

exports.getAllTeachers = (req, res) => {
  User.find({ role: "1" })
    .select("-photo")
    .exec((err, teachers) => {
      if (err || !teachers) {
        return res.status(400).json({ error: "no user found" });
      }
      res.json(teachers);
    });
};
exports.getAllStudents = (req, res) => {
  User.find({ role: "0" })
    .select("-photo")
    .exec((err, teachers) => {
      if (err || !teachers) {
        return res.status(400).json({ error: "no user found" });
      }
      res.json(teachers);
    });
};
