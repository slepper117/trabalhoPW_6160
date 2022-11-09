import { Error400 } from '../../classes/errors.js';

/**
 * Check if value is type Boolean
 * @param {string} field - Field where check occurs
 * @param {*} value - Value to be checked
 */
function isBoolean(field, value) {
  const isBool = typeof value === 'boolean' || value instanceof Boolean;

  if (!isBool)
    throw new Error400(`${field}-is-not-boolean`, `${field} is not a boolean`);
}
export default isBoolean;
