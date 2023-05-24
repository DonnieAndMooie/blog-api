const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Admin: {type: Boolean, default: false}
})

module.exports = mongoose.model("User", UserSchema)