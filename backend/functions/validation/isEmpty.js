import isString from './isString.js';
import { Error400 } from '../../classes/errors.js';

/**
 * Check if a value is a String and if it's Empty
 * @param {string} field - Field where check occurs
 * @param {*} value - Value to be checked
 * @param {boolean} whitespace - Option for remove whitespaces. Default: `true`
 */
function isEmpty(field, value, whitespace = true) {
  isString(field, value);

  if ((whitespace ? value.trim().length : value.length) === 0)
    throw new Error400(`${field}-is-empty`, `The ${field} cannot be empty`);
}

export default isEmpty;
