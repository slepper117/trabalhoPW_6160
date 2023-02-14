import { Error400 } from '../../classes/errors.js';

/**
 *
 * @param {string} field - Field where check occurs
 * @param {*} value - Value to be checked
 * @param {integer} radix - Value of the radix . Default: `10`
 * @returns A value of the type Number
 */
function toInt(field, value, radix = 10) {
  const aux = parseInt(value, radix);

  if (Number.isNaN(aux)) {
    throw new Error400(
      `${field}-not-int', 'The ${field} number is not a integer`,
    );
  }

  return aux;
}

export default toInt;
