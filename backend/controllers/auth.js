import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import query from '../database/index.js';
import cookiesConfig from '../config/cookies.js';
import { Error400, Error401 } from '../classes/errors.js';

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    // Check mandatory properties
    if (!email || !password) {
      throw new Error400(
        'email-password-required',
        'Email and Password Required',
      );
    }

    // Check if user exists
    const existingUser = await query(
      'SELECT * FROM crm.users WHERE email = $1',
      [email],
    );
    if (existingUser.rowCount === 0)
      throw new Error401('email-password-wrong', 'Wrong Email or Password');

    // Check if password is correct
    const correctPassword = await bcrypt.compare(
      password,
      existingUser.rows[0].password,
    );
    if (!correctPassword)
      throw new Error401('email-password-wrong', 'Wrong Email or Password');

    // Generates JWT Token
    const token = jwt.sign(
      { id: existingUser.rows[0].id },
      process.env.JWT_SECRET,
    );

    // Sends cookie with JWT Web Token
    res.cookie('token', token, cookiesConfig.login).send();
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    // Sends blank cookie
    res.cookie('token', '', cookiesConfig.logout).send();
  } catch (err) {
    next(err);
  }
}

async function isAuthenticated(req, res) {
  const { token } = req.cookies;

  try {
    // Validates presence of token
    if (!token) {
      return res.json(null);
    }

    // Check if Token is valid
    const validatedUser = jwt.verify(token, process.env.JWT_SECRET);

    return res.json(validatedUser.id);
  } catch (err) {
    return res.json(null);
  }
}

export { login, logout, isAuthenticated };
