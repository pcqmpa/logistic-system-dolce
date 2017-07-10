/**
 * Module with some server validations.
 * @module src/server/utils/validations
 */

export const validateParams = (params, requiredParams) => {
  const valid = requiredParams.every(param => (!!params[param]));
  return valid;
};
