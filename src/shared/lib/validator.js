/**
 * Module with form validator.
 * @module src/shared/lib/validator
 */
// Utils.
import { string } from '../utils/';

// Constants.
import { REQUIRED } from '../constants/types';

/**
 * Checks every prop based on a set of rules,
 * returns an object with the validation resume.
 * @param {Object} rules -> The set of rules.
 * @param {Object} data -> The form data.
 * @returns {Object} -> The data validation.
 */
const run = (rules, data) => {
  const resume = Object.keys(rules).reduce((validation, prop) => {
    let passed = true;
    if (rules[prop].rule === REQUIRED) {
      passed = !string.empty(data[prop].toString());
    }

    return {
      ...validation,
      [prop]: passed
    };
  }, {});

  const valid = Object.keys(resume)
    .every(prop => (resume[prop]));

  return { resume, valid };
};

export default { run };
