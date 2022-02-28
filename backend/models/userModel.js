const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter name"],
    maxLength: [30, "Name cannot Exceed 30 chars"],
    minLength: [4, "Name must have more than 4 chars"],
  },
  email: {
    type: String,
    required: [true, "Enter email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "enter password"],
    minLength: [8, "Password must have more than 8 chars"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});
//JWT Token

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compare Password

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Generating Password Reset Token

userSchema.methods.getResetPasswordToken = function () {
  //Generating token
  const resetToken = crypto.randomBytes(20).toString("hex");
  //Hashing ans adding resetPassword to user schema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};
module.exports = mongoose.model("User", userSchema);
