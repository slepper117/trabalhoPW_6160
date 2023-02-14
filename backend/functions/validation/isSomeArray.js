import { Error400 } from '../../classes/errors.js';

/**
 * Check if an element of an array includes other elements of array
 * @param {string} field - Field where check occurs
 * @param {string[]} value - Array to be checked
 * @param {string[]} array - Array of values
 */
function isSomeArray(field, value, array) {
  if (value.length === 0)
    throw new Error400(`${field}-is-empty`, `The ${field} cannot be empty`);

  const aux = value.some((i) => array.includes(i));
  if (!aux) {
    throw new Error400(
      `${field}-dosent-exist`,
      `The indicated ${field} does not exist`,
    );
  }
}

export default isSomeArray;
