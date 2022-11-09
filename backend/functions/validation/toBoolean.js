import isStrBoolean from './isStrBoolean.js';

/**
 * Check if value is a String Boolean and converts to type Boolean
 * @param {string} field - Field where check occurs
 * @param {*} value - Value to be checked
 * @returns Type boolean
 */
function toBoolean(field, value) {
  isStrBoolean(field, value);

  return value === '1' || /^true$/i.test(value);
}

export default toBoolean;
