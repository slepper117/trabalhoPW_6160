import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Error400, Error401 } from '../classes/errors.js';
import checkEmail from '../functions/emailExist.js';
import cookiesConfig from '../config/cookies.js';

async function logIn(req, res, next) {
  try {
    const { email, password } = req.body;

    // Validação
    if (!email || !password)
      throw new Error400(
        'email-password-required',
        'Email and Password Required'
      );

    // Verifica se o email existe na BD
    const existingUser = await checkEmail(email);
    if (!existingUser)
      throw new Error401('email-password-wrong', 'Wrong Email or Password');

    // Confirma que a password é a correta
    const correctPassword = await bcrypt.compare(
      password,
      existingUser.rows[0].password
    );
    if (!correctPassword)
      throw new Error401('email-password-wrong', 'Wrong Email or Password');

    // Cria o JWT Token
    const token = jwt.sign(
      { id: existingUser.rows[0].id },
      process.env.JWT_SECRET
    );

    // Retorna o cookie com JWT Token
    res.cookie('token', token, cookiesConfig.login).send();
  } catch (err) {
    next(err);
  }
}

async function loggedIn(req, res) {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.json(null);
    }

    const validatedUser = jwt.verify(token, process.env.JWT_SECRET);

    return res.json(validatedUser.id);
  } catch (err) {
    return res.json(null);
  }
}

async function logOut(_req, res, next) {
  try {
    res.cookie('token', '', cookiesConfig.logout).send();
  } catch (err) {
    next(err);
  }
}

export { logIn, loggedIn, logOut };
