const passport = require("passport");
(localStrategy = require("passport-local").Strategy),
  (User = require("../database/Schema").User),
  (shortid = require("shortid"));

passport.serializeUser((user, cb) => {
  cb(null, user);
});
