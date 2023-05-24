const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    text: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    timestamp: {type: Date, default: Date.now(), required: true},
    blog: {type: Schema.Types.ObjectId, ref: "Blog", required: true}
})

module.exports = mongoose.model("Comment", CommentSchema)