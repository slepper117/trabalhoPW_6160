import query from '../database/index.js';
import { Error400, Error404 } from '../classes/errors.js';

/**
 * Function to check if an ID exists
 * @param {string} param Relation where verification occurs
 * @returns
 */
function checkID(param) {
  return async (req, res, next) => {
    try {
      // Parse string to number
      const id = parseInt(req.params.id, 10);

      // Check if is number
      if (!Number.isInteger(id))
        throw new Error400('id-not-number', 'The ID is not a number');

      // Queries the database for the ID
      const getPost = await query(`SELECT id FROM crm.${param} WHERE id = $1`, [
        id,
      ]);

      // Verifies result
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
