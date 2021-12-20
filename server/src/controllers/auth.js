import passport from "passport";
import User from "../models/user.js";

export const login = (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(500).json({ message: "body empty" });
    }

    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(500).json({ message: "authentication failed" });
      }
      return req.logIn(user, function (loginErr) {
        if (loginErr) {
          return next(loginErr);
        }
        return res.json({ login: true });
      });
    })(req, res, next);
  } catch (error) {
    console.log("login account error", error);
    // return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const register = async (req, res, next) => {
  const { email, username, password } = req.body;

  try {
    if (!email || !username || !password) {
      return res.status(500).json({ message: "body empty" });
    }

    const userExits = await User.findOne({ $or: [{ email }, { username }] });
    if (userExits) {
      return res.status(409).json({ message: "account is exits." });
    }

    User.register(new User({ username, email }), password, function (err, account) {
      if (err) {
        return next(err);
      }
      passport.authenticate("local", (authErr, user, info) => {
        if (authErr) {
          return next(authErr);
        }
        return req.login(user, function (loginErr) {
          if (loginErr) {
            return next(loginErr);
          }
          return res.json({ login: true });
        });
      })(req, res, next);
    });
  } catch (error) {
    console.log("error login", error);
    // return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const checkLogin = (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      let err = new Error("User not authenticated.");
      err.statusCode = 500;
      throw err;
    }
    res.json(req.user);
  } catch (error) {
    console.log("error check login", error);
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  try {
    req.logOut();
    res.clearCookie("connect.sid");
    if (req.session) {
      req.session.destroy();
    }
    res.json({ logout: true });
  } catch (error) {
    console.log("logout error", error);
    res.status(500).json({ message: error });
  }
};
