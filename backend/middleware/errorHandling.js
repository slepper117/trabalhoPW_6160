import logger from '../config/winston.js';

/**
 * Logs all errors
 * @param {*} err Error
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next Middleware
 */
const errorLogger = (err, req, res, next) => {
  const { originalUrl, ip } = req;
  if (err.statusCode === 400) {
    logger.warn({ error: { err }, request: { originalUrl, ip } });
  } else {
    logger.error({ error: { err }, request: { originalUrl, ip } });
  }
  next(err);
};

/**
 * Generates a JSON Response with the error info
 * @param {*} err Error
 * @param {*} req Request
 * @param {*} res Response
 */
const errorHandler = (err, req, res) => {
  let { name, message, statusCode, infoCode } = err;

  if (statusCode === undefined) {
    name = 'internal-error';
    message = 'Something wrong happened. Our Techical Team was advised.';
    statusCode = 500;
    infoCode = 'Internal Server Error';
  }

  res
    .header('Content-Type', 'application/json')
    .status(statusCode)
    .send(
      JSON.stringify(
        { name, message, data: { statusCode, infoCode } },
        null,
        4,
      ),
    );
};

export { errorHandler, errorLogger };
