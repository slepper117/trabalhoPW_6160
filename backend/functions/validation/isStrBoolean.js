import isString from './isString.js';
import { Error400 } from '../../classes/errors.js';

const arrayBoolean = ['true', 'false', '1', '0'];

/**
 * Check if value is a String and Boolean
 * @param {string} field - Field where check occurs
 * @param {*} value - Value to be checked in lowercase
 */
function isStrBoolean(field, value) {
  isString(field, value);

  const aux = arrayBoolean.includes(value);
  if (!aux)
    throw new Error400(`${field}-not-boolean', 'The ${field} is not a boolean`);
}

export default isStrBoolean;
