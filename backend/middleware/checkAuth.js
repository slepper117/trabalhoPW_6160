import jwt from 'jsonwebtoken';
import { Error401 } from '../classes/errors.js';

function checkAuth(req, _res, next) {
  try {
    const { token } = req.cookies;

    // Se não existe Token, cancela o pedido
    if (!token) throw new Error401('route-protected', 'Not Authorized');

    // Se existe Token verifica
    const validateUser = jwt.verify(token, process.env.JWT_SECRET);

    // Devolve o id
    req.user = validateUser.id;
    next();
  } catch (err) {
    next(err);
  }
}

export default checkAuth;
