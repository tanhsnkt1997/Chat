import User from "../models/user.js";
// import passportLocal from "passport-local";
import { Strategy as LocalStrategy } from "passport-local";

// const LocalStrategy = passportLocal.Strategy;

const passportConfig = (passport) => {
  // use static authenticate method of model in LocalStrategy
  // passport.use(new LocalStrategy(User.authenticate()));
  passport.use(User.createStrategy());

  // use static serialize and deserialize of model for passport session support
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};

export default passportConfig;
