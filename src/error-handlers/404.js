/**
 * 404 Errors Handler.
 * @param {object} req
 * @param {object} res
 * @param {Function} next Next middleware call function.
 */
module.exports = (req, res, next) => {
  res.status(404).json({
    status: 404,
    message: "Sorry, we couldn't find what are you looking for!",
  });

  next();
};
