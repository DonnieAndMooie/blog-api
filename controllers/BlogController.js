const { body, validationResult } = require("express-validator");
const Blog = require("../models/Blog");

exports.blogs_get = async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
};

exports.blog_get = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    res.json(blog);
  } catch (err) {
    return res.status(404).json({
      message: "Blog not found",
      error: err.message,
    });
  }
};

exports.blog_post = [
  body("title")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Title must be at least 3 characters"),
  body("content")
    .trim()
    .isLength({ min: 100 })
    .escape()
    .withMessage("Content must be at least 100 characters"),

  async (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
      return res.json(errors.array());
    }

    console.log(req.user);

    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      timestamp: Date.now(),
      author: req.user,
      published: true,
    });

    await blog.save();

    res.json(blog);
  },

];

exports.blog_update = [
  body("title")
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ min: 3 })
    .escape()
    .withMessage("Title must be at least 3 characters"),
  body("content")
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ min: 100 })
    .escape()
    .withMessage("Content must be at least 100 characters"),
  async (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
      return res.json(errors.array());
    }

    const changes = {
      title: req.body.title,
      content: req.body.content,
    };

    try {
      const updatedResult = await Blog.findByIdAndUpdate(req.params.blogId, changes, { new: true });
      return res.json(updatedResult);
    } catch (err) {
      res.json({
        message: "Blog not found",
        error: err.message,
      });
    }
  }];

exports.blog_delete = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.blogId);
    res.json(deletedBlog);
  } catch (err) {
    res.json({
      message: "Blog could not be found",
      error: err.message,
    });
  }
};
