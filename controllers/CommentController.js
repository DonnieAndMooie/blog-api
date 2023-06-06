const { body, validationResult } = require("express-validator");
const Comment = require("../models/Comment");

exports.comment_post = [
  body("text")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Comment must contain at least 3 characters"),

  async (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
      return res.json(errors.array());
    }

    const comment = new Comment({
      text: req.body.text,
      author: req.user._id,
      timestamp: Date.now(),
      blog: req.params.blogId,
    });

    try {
      await comment.save();
      return res.json(comment);
    } catch (err) {
      return res.status(404).json({
        message: "An error occurred",
        error: err.messsage,
      });
    }
  },
];

exports.comment_update = [
  body("text")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Comment must contain at least 3 characters"),

  async (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
      return res.json(errors.array());
    }

    const changes = {
      text: req.body.text,
    };

    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        changes,
        { new: true },
      );
      return res.json(updatedComment);
    } catch (err) {
      res.json({
        message: "Comment not found",
        error: err.message,
      });
    }
  },
];

exports.comment_delete = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
    return res.json(deletedComment);
  } catch (err) {
    return res.status(404).json({
      message: "Comment could not be found",
      error: err.message,
    });
  }
};

exports.comments_get = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId }).populate("author");
    res.json(comments);
  } catch (err) {
    res.status(404).json({
      message: "Comments could not be found",
      error: err.message,
    });
  }
};

exports.comment_get = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId).populate("author");
    res.json(comment);
  } catch (err) {
    res.status(404).json({
      message: "Comment could not be found",
      error: err.message,
    });
  }
};
