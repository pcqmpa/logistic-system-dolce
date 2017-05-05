/**
 * Module with some utils to encode and decode strings to base64.
 * @module src/server/utils/string-base64
 */
import { string } from '../../shared/utils/';

/**
 * Decodes a valid base64 string.
 * @param {String} str -> The base64 string.
 * @returns {String} -> The decoded string.
 */
const decode = (str) => {
  string.assert(str);
  return Buffer.from(str, 'base64').toString();
};

/**
 * Encodes a valid string into base64.
 * @param {String} str -> The string to encode.
 * @returns {String} -> A base64 string.
 */
const encode = (str) => {
  string.assert(str);
  return Buffer.from(str, 'utf8').toString('base64');
};

export default { decode, encode };
