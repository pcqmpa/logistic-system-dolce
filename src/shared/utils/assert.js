/**
 * Module with an assertion utility.
 * @module src/shared/utils/assert
 */
// App Config.
import { env } from '../../../config/';

/**
 * Assertion method.
 * @param {Boolean} predicate -> Expression to evaluate.
 * @param {String} message -> The message when the assertion fails.
 * @returns {void}
 */
const assert = (predicate, message = 'Unknown Error') => {
  if (env.DEBUG) {
    if (!predicate) {
      throw new Error(message);
    }
  }
};

export default assert;
