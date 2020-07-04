var mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 40,
      trim: true,
    },
    fatherName: {
      type: String,
      required: true,
      maxlength: 40,
      trim: true,
    },
    phone: {
      type: String,
      require: true,
      maxlength: 13,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    gender: {
      type: String,
      require: true, // :male or female
    },
    desingn: {
      type: String,
      //for teachers only (TGT or PGT)
    },
    cls: {
      type: String,
      // for students
    },
    streme: {
      type: String,
      // for 11th and 12th class students (arts, com, sci)
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    role: {
      type: Number,
      default: 0, // for admin = 5, teacher = 1 and students = 0
    },
    enc_password: {
      type: String,
      required: true,
    },
    salt: String,
  },
  { timestamps: true }
);

// create virtual field for password

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.enc_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (planePassword) {
    return this.encryptPassword(planePassword) === this.enc_password;
  },

  encryptPassword: function (planePassword) {
    if (!planePassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(planePassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
