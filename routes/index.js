const express = require('express');
const router = express.Router();
const UserController = require("../controllers/UserController")
const BlogController = require("../controllers/BlogController")
const CommentController = require("../controllers/CommentController")

router.post("/sign-up", UserController.sign_up_post)

router.post("/login", UserController.login_post)

router.get("/users", UserController.users_get)

router.get("/users/:userId", UserController.user_get)

router.get("/blogs", BlogController.blogs_get)

router.get("/blogs/:blogId", BlogController.blog_get)

router.post("/blog", BlogController.blog_post)

router.put("/blog/:blogId", BlogController.blog_update)

router.delete("/blog/:blogId", BlogController.blog_delete)

router.post("/blog/:blogId/comment", CommentController.comment_post)

router.put("/blog/:blogId/comment/:commentId", CommentController.comment_update)

router.delete("/blog/:blog:Id/comment/:commentId", CommentController.comment_delete)

router.get("/blog/:blogId/comments/", CommentController.comments_get)

router.get("/blog/:blogId/comment/:commentId", CommentController.comment_get)

module.exports = router;
