/**
 * Module with some array helpers.
 * @module src/shared/utils/helpers/array
 */
// Utils.
import { assert } from '../';

/**
 * Returns the element in the array with a key.
 * @param {Array} arr -> The array source.
 * @param {Number} key -> The key of the element.
 * @return {Any} -> The element at the position.
 */
const get = (arr, key) => {
  assert(Array.isArray(arr), 'Argument needs to be a valid array');
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
const findIndexById = (arr, id) => {
  assert(Array.isArray(arr), 'Argument needs to be a valid array');
  return arr.reduce((result, element, index) => (
    (element.id === id) ? index : result
  ), 0);
};

/**
 * Flattens a two dimensional array.
 * @param {Array} arr -> The two dimensional array.
 * @returns {Array} -> The flatten array.
 */
const flat = (arr) => {
  assert(Array.isArray(arr), 'Argument needs to be a valid array');
  return arr.reduce((flattended, element) => {
    flattended.push(...element);
    return flattended;
  }, []);
};

export default { get, findIndexById, flat };
