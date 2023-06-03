const express = require("express");

const router = express.Router();
const passport = require("passport");
const UserController = require("../controllers/UserController");
const BlogController = require("../controllers/BlogController");
const CommentController = require("../controllers/CommentController");

router.post("/sign-up", UserController.sign_up_post);

router.post("/login", UserController.login_post);

router.get("/users", passport.authenticate("jwt", { session: false }), UserController.users_get);

router.get("/users/:userId", UserController.user_get);

router.get("/blogs", BlogController.blogs_get);

router.get("/blogs/:blogId", BlogController.blog_get);

router.post("/blogs", passport.authenticate("jwt", { session: false }), BlogController.blog_post);

router.put("/blogs/:blogId", passport.authenticate("jwt", { session: false }), BlogController.blog_update);

router.delete("/blogs/:blogId", passport.authenticate("jwt", { session: false }), BlogController.blog_delete);

router.post("/blogs/:blogId/comments", passport.authenticate("jwt", { session: false }), CommentController.comment_post);

router.put("/blogs/:blogId/comments/:commentId", passport.authenticate("jwt", { session: false }), CommentController.comment_update);

router.delete("/blogs/:blog:Id/comments/:commentId", passport.authenticate("jwt", { session: false }), CommentController.comment_delete);

router.get("/blogs/:blogId/comments/", CommentController.comments_get);

router.get("/blogs/:blogId/comments/:commentId", CommentController.comment_get);

module.exports = router;
