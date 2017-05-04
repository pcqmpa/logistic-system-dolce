/**
 * Module with string helpers.
 * @module src/utils/helpers/string
 */

/**
 * Checks if the element is of type String.
 * @param {Any} element -> The element to validate.
 * @returns {Boolean} -> If the element passed the test.
 */
const isString = element => (
  element.constructor === String
);

/**
 * String assertion.
 * @private
 * @param {Any} element -> The element to assert.
 * @returns {void}
 */
const assert = (element) => {
  if (!isString(element)) {
    throw new Error('Argument needs to be a valid string');
  }
};

/**
 * Checks if a string is empty
 * @param string
 */
const empty = (string) => {
  assert(string);

  return (string.length === 0);
};

export default { empty, isString, assert };
