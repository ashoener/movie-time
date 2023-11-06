/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default (req, res, next) => {
  if (!req.session.loggedIn) return next();
  res.redirect("/");
};
