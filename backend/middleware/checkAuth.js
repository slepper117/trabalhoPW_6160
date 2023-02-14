import jwt from 'jsonwebtoken';
import { Error401 } from '../classes/errors.js';

function checkAuth(req, res, next) {
  const { token } = req.cookies;

  try {
    // If token doesn’t exists
    if (!token) throw new Error401('route-protected', 'Not Authorized');

    // Verifies Token
    const validateUser = jwt.verify(token, process.env.JWT_SECRET);

    // Returns ID in request
    req.user = validateUser.id;
    next();
  } catch (err) {
    next(err);
  }
}

export default checkAuth;
