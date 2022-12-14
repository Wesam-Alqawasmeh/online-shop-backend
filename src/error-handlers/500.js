/**
 * 500 Errors handler.
 * @param {object} err Error object.
 * @param {object} req
 * @param {object} res
 * @param {Function} next Next middleware call function.
 */
module.exports = (err, req, res, next) => {
  res.status(500).json({
    status: 500,
    message: err.message ? err.message : err,
  });

  next();
};
