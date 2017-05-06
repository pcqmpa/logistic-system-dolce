/**
 * Module with number helpers.
 * @module src/utils/helpers/string
 */

/**
 * Checks if the element is of type Number.
 * @param {Any} element -> The element to validate.
 * @returns {Boolean} -> If the element passed the test.
 */
const isNumber = element => (
  element.constructor === Number
);

export default { isNumber };
