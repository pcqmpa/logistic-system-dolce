/**
 * Module with the form rules reducer.
 * @module src/shared/reducers/form-rules
 */
// Redux.
import { createReducer } from 'redux-create-reducer';

// Actions.
import {
  UPDATE_RULES_VALIDATION,
  CLEAR_RULES_VALIDATION
} from '../constants/actions';

// Constants.
import { REQUIRED, OPTIONAL } from '../constants/types';

/**
 * Optional rule.
 * @type {Object}
 */
const optionalRule = {
  rule: OPTIONAL,
  valid: true
};

/**
 * Form initial and default rule.
 * @type {Object}
 */
const initialRule = {
  rule: REQUIRED,
  valid: true
};

/**
 * Users filter.
 * @type {Object}
 */
const usersFilter = {
  fullname: optionalRule,
  type: optionalRule
};

/**
 * New user rules
 * @type {Object}
 */
const newUser = {
  username: initialRule,
  password: initialRule,
  fullname: initialRule,
  type: initialRule
};

/**
 * Login.
 * @type {Object}
 */
const login = {
  username: initialRule,
  password: initialRule,
  rememberMe: optionalRule
};

/**
 * Reducer initial state.
 * @type {Object}
 */
const initialState = {
  login,
  newUser,
  usersFilter
};

/**
 * Form rules action handlers.
 * @type {Object}
 */
const actionHandlers = {
  [UPDATE_RULES_VALIDATION]: (state, { form, data }) => ({
    ...state,
    [form]: Object.keys(state[form])
      .reduce((rules, prop) => ({
        ...rules,
        [prop]: {
          ...state[form][prop],
          valid: data[prop]
        }
      }), {})
  }),
  [CLEAR_RULES_VALIDATION]: () => (initialState)
};

export default createReducer(initialState, actionHandlers);
