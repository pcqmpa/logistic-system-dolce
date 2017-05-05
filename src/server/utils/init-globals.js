/**
 * Module with the utility to initialize node globals.
 * @module src/server/utils/init-globals
 */
// Utils.
import { string64 } from './';

/**
 * Attaches some utilities to the node global.
 * @returns {void}
 */
const initGlobals = () => {
  global.btoa = string64.encode;
};

export default initGlobals;
