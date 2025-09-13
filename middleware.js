module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //store the url they are requesting
    console.log(req.path, req.originalUrl);
    req.session.returnTo = req.originalUrl;
    req.flash("error", "YOU must be signed in first");
    return res.redirect("/login");
  }
  next();
};


module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}