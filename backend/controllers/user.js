import bcrypt from 'bcrypt';
import query from '../database/index.js';
import checkemail from '../functions/emailExist.js';
import { Error400 } from '../classes/errors.js';

async function createUser(req, res, next) {
  try {
    const { email, password, passwordVerify } = req.body;

    // Validação
    if (!email || !password || !passwordVerify) {
      throw new Error400(
        'username-required-fields',
        'Please enter required fields'
      );
    }
    if (password.lenght < 6) {
      throw new Error400(
        'username-password',
        'Please enter password with more then 6 char'
      );
    }
    if (password !== passwordVerify) {
      throw new Error400(
        'username-password',
        'Please enter the same password twice'
      );
    }

    // Check if email exists
    const boolCheck = checkemail(email);
    if (!boolCheck) {
      throw new Error400('username-password', 'Email already registered');
    }

    // Hash Password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Cria Registo
    const newUser = await query(
      'INSERT INTO crm.users(email, password) VALUES($1, $2) RETURNING *',
      [email, passwordHash]
    );

    // Responde ao Request
    res.status(200).json(newUser.rows[0]);
  } catch (err) {
    next(err);
  }
}

async function readUser(req, res, next) {
  try {
    const { id } = req.params;
    const getUser = await query(
      'SELECT id, email FROM crm.users WHERE user_id = $1',
      [id]
    );
    res.json(getUser.rows[0]);
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const editUser = await query(
      'UPDATE crm.users SET description = $1 WHERE id = $2 RETURNING *',
      [email, id]
    );
    res.json(editUser.rows);
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    const delUser = await query('DELETE FROM crm.users WHERE id = $1', [id]);
    res.json(`Utilizador ${delUser} Removido com Sucesso!`);
  } catch (err) {
    next(err);
  }
}

async function listUsers(_req, res, next) {
  try {
    const allUsers = await query('SELECT id, email FROM crm.users');
    res.json(allUsers.rows);
  } catch (err) {
    next(err);
  }
}

export { createUser, readUser, updateUser, deleteUser, listUsers };
