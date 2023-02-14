import query from '../database/index.js';
import isBoolean from './validation/isBoolean.js';
import isEmpty from './validation/isEmpty.js';
import isInArray from './validation/isInArray.js';
import isSomeArray from './validation/isSomeArray.js';
import isStrBoolean from './validation/isStrBoolean.js';
import isString from './validation/isString.js';
import toArray from './validation/toArray.js';
import toArrayNum from './validation/toArrayNum.js';
import toBoolean from './validation/toBoolean.js';
import toInt from './validation/toInt.js';

/**
 * Function that transforms a array in a string
 * @param {any[]} array Arrau to transform
 * @returns String
 */
function arrayToString(array) {
  const resString = JSON.stringify(array)
    // eslint-disable-next-line no-useless-escape
    .replace(/[\]\[]+/g, '')
    .replace(/"/g, "'");
  return resString;
}

/**
 * Function to verify if an ID exists
 * @param {string} field Field where check is made
 * @param {string} value Value to be checked
 * @param {string} relation Relation where ID is
 */
async function idExist(field, value, relation) {
  const queryID = await query(`SELECT id FROM crm.${relation}`);
  const aux = queryID.rows.map(({ id }) => id);

  isSomeArray(field, value, aux);
}

export { arrayToString, idExist };
export {
  isBoolean,
  isEmpty,
  isInArray,
  isSomeArray,
  isStrBoolean,
  isString,
  toArray,
  toArrayNum,
  toBoolean,
  toInt,
};
