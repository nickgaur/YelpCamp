const Campground = require("../models/campground");
const User = require("../models/user");

module.exports.renderRegisterForm = (req, res) => {
  res.render("campgrounds/register");
};

module.exports.postRegisterForm = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to YelpCamp !");
      res.redirect(`/`);
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

module.exports.renderLoginForm = async (req, res) => {
  res.render("campgrounds/login");
};

module.exports.postLoginForm = (req, res) => {
  req.flash("success", "Welcome Back");
  const redirectTo = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectTo);
};

module.exports.logout = (req, res) => {
  req.logOut();
  req.flash("success", "GoodBye");
  res.redirect("/campgrounds");
};
