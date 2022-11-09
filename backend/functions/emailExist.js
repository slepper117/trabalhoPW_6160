import query from '../database/index.js';

/**
 * Função para verificar que o email existe
 * @param {string} email - Email to check
 * @returns {boolean} - Boolean Result
 */
async function emailExist(email) {
  const emailString = String(email);
  const existingUser = await query('SELECT * FROM crm.users WHERE email = $1', [
    emailString
  ]);

  if (existingUser.rowCount === 0) return false;

  return existingUser;
}

export default emailExist;
