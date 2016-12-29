/**
 * Module with some array helpers.
 * @module src/shared/utils/helpers/array
 */

/**
 * Returns the element in the array with a key.
 * @param {Array} arr -> The array source.
 * @param {Number} key -> The key of the element.
 * @return {Any} -> The element at the position.
 */
const get = (arr, key) => {
  if (key === null) {
    return arr[0];
  }

  if (key >= arr.length) {
    return null;
  }

  return arr[key];
};

/**
 * Search for a coincindence that matches a id prop.
 * @param {Array} arr -> The array source.
 * @param {Any} id -> The id to search for.
 * @return {Any} -> The element that matches the condition.
 */
const findIndexById = (arr, id) => (
  arr.reduce((result, element, index) => (
    (element.id === id) ? index : result
  ), 0)
);

export default { get, findIndexById };
