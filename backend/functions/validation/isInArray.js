import { Error400 } from '../../classes/errors.js';

/**
 * Check if an array includes a value
 * @param {string} field - Field where check occurs
 * @param {*} value - Value to be checked
 * @param {string[]} array - Array of values
 */
function isInArray(field, value, array) {
  // small check to see if value as more than a value
  const arrayValue = value.split(',');
  if (arrayValue.length > 1)
    throw new Error400(
      `${field}-invalid`,
      `${field} cannot have more than one value`
    );

  const aux = array.includes(value);
  if (!aux)
    throw new Error400(
      `${field}-dosent-exist`,
      `The indicated ${field} does not exist`
    );
}

export default isInArray;
