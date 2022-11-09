import query from '../database/index.js';
import { Error400, Error404 } from '../classes/errors.js';

function checkID(param) {
  return async (req, _res, next) => {
    try {
      // Parse string to INT
      const id = parseInt(req.params.id, 10);

      // Ckeck if is INT
      if (!Number.isInteger(id))
        throw new Error400('id-not-number', 'The ID is not a number');

      // Procura na Base de Dados um registo
      const getPost = await query(`SELECT id FROM crm.${param} WHERE id = $1`, [
        id
      ]);

      // Verifica resultado
      if (getPost.rowCount === 0)
        throw new Error404('resource-not-found', 'ID not found');

      req.id = getPost.rows[0].id;
      next();
    } catch (err) {
      next(err);
    }
  };
}

export default checkID;
