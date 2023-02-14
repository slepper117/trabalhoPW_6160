import bcrypt from 'bcrypt';
import query from '../database/index.js';
import { Error400 } from '../classes/errors.js';

async function createUser(req, res, next) {
  try {
    const { email, password, passwordVerify } = req.body;

    // Check mandatory properties
    if (!email || !password || !passwordVerify)
      throw new Error400(
        'username-required-fields',
        'Please enter required fields',
      );

    // Validates password lenght
    if (password.lenght < 6)
      throw new Error400(
        'username-password',
        'Please enter password with more then 6 char',
      );

    // Confirms password in second field
    if (password !== passwordVerify)
      throw new Error400(
        'username-password',
        'Please enter the same password twice',
      );

    // Check if email exists
    const existingEmail = await query(
      'SELECT * FROM crm.users WHERE email = $1',
      [email],
    );
    if (existingEmail.rowCount !== 0)
      throw new Error400('username-password', 'Email already registered');

    // Hash Password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Inserts new user on database
    const newUser = await query(
      'INSERT INTO crm.users(email, password) VALUES($1, $2) RETURNING *',
      [email, passwordHash],
    );

    // Sends the result
    res.status(200).json(newUser.rows[0]);
  } catch (err) {
    next(err);
  }
}

async function readUser(req, res, next) {
  const { id } = req.params;

  try {
    // Queries database to retrieve object
    const getUser = await query(
      'SELECT id, email FROM crm.users WHERE user_id = $1',
      [id],
    );

    // Sends the result
    res.json(getUser.rows[0]);
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  const { id } = req.params;
  const { email } = req.body;

  try {
    // Updates user on database
    const editUser = await query(
      'UPDATE crm.users SET description = $1 WHERE id = $2 RETURNING *',
      [email, id],
    );

    // Sends the result
    res.json(editUser.rows);
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  const { id } = req.params;

  try {
    // Deletes record from database
    const delUser = await query('DELETE FROM crm.users WHERE id = $1', [id]);

    // Sends the result
    res.json(`Utilizador ${delUser} Removido com Sucesso!`);
  } catch (err) {
    next(err);
  }
}

async function listUsers(_req, res, next) {
  try {
    // Queries Database
    const allUsers = await query('SELECT id, email FROM crm.users');

    // Sends the result
    res.json(allUsers.rows);
  } catch (err) {
    next(err);
  }
}

export { createUser, readUser, updateUser, deleteUser, listUsers };
