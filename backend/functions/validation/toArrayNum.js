import toArray from './toArray.js';
import { Error400 } from '../../classes/errors.js';

/**
 * Converts a String into an Array, then checks if all the values are Numbers
 * @param {string} field - Field where check occurs
 * @param {*} value - Value to be checked
 * @param {string} separator - Separator of the array. Default: `','`
 * @returns Array of Numbers
 */
function toArrayNum(field, value, separator = ',') {
  const aux = toArray(field, value, separator).map(Number);

  if (aux.some(Number.isNaN)) {
    throw new Error400(
      `${field}-dosent-exist`,
      `The indicated ${field} does not exist`,
    );
  }

  return aux;
}

export default toArrayNum;
