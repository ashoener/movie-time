/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default (req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn || false;
  res.locals.userId = req.session.userId || -1;
  next();
};
