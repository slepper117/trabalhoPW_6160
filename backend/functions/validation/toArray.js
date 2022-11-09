import isEmpty from './isEmpty.js';

/**
 * Check if value is a string and not empty and coverts to Array
 * @param {string} field - Field where check occurs
 * @param {*} value - Value to be checked
 * @param {string} separator - Separator of the array. Default: `','`
 * @returns Array of Strings string
 */
function toArray(field, value, separator = ',') {
  isEmpty(field, value);

  return value.split(separator);
}

export default toArray;
