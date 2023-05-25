const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
require("dotenv").config();
const passport = require("passport");
const User = require("./models/User");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

module.exports = new JwtStrategy(opts, async (payload, done) => {
  console.log("jwt strategy running");
  console.log(payload);
  const user = await User.findOne({ username: payload.username });
  if (user) {
    return done(null, true);
  }
  return done(null, false, { message: "User does not exist" });
});