import { Error400 } from '../../classes/errors.js';

/**
 * Check if a value is a String
 * @param {string} field - Field where check occurs
 * @param {*} value - Value to be checked
 */
function isString(field, value) {
  const isStr = typeof value === 'string' || value instanceof String;

  if (!isStr)
    throw new Error400(`${field}-is-not-string`, `${field} is not a string`);
}

export default isString;
