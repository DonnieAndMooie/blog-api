const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.sign_up_post = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Username must be at least 3 characters"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage("Password must be at least 6 characters long"),

  (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
      return res.json(errors.array());
    }

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) throw err;
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });

      await user.save();
      res.json(user);
    });
  },
];

exports.login_post = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Username must be at least 3 characters"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage("Password must be at least 6 characters long"),

  async (req, res) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      return res.json(errors.array());
    }

    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(404).json({ message: "Could not find user" });
    }

    bcrypt.compare(req.body.password, user.password, (err, resolved) => {
      if (resolved) {
        const opts = {};
        opts.expiresIn = "24h";
        const secret = process.env.SECRET_KEY;
        const token = jwt.sign({ username: user.username }, secret, opts);
        return res.status(200).json({
          message: "Auth passed",
          token,
          userId: user._id
        });
      }

      res.status(401).json({ message: "Incorrect Password" });
    });
  },
];

exports.users_get = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

exports.user_get = async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.json(user);
};
