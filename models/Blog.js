const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BlogSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    timestamp: {type: Date, default: Date.now(), required: true},
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    published: {type: Boolean, default: true, required: true}
})

module.exports = mongoose.model("Blog", BlogSchema)