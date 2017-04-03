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
import {
  STRING,
  NUMBER,
  ARRAY,
  CHECKED_LIST,

  REQUIRED,
  OPTIONAL
} from '../constants/types';

//
// Initial State.
// -----------------------------------------------------------------------------

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
const requiredRule = {
  rule: REQUIRED,
  valid: true
};

/**
 * Create a required rule.
 * @param {String} type -> The type of the rule.
 * @returns {Object} -> The rule.
 */
const createRule = (type = STRING) => ({
  ...requiredRule,
  type
});

/**
 * Assign orders to distributor form.
 * @type {Object}
 */
const assignOrdersForm = {
  distributorUser: createRule(STRING),
  ordersToAssignList: createRule(CHECKED_LIST)
};

/**
 * Package Reception form.
 * @type {Object}
 */
const packageReceptionForm = {
  ordersList: createRule(CHECKED_LIST)
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
 * Assign Transporter form.
 * @type {Object}
 */
const transporterForm = {
  idUser: createRule(),
  nameUser: optionalRule,
  idTransporter: createRule(NUMBER),
  isSubmitting: optionalRule,
  failed: optionalRule
};

/**
 * Assign Distributors form.
 * @type {Object}
 */
const distributorForm = {
  idTransporter: createRule(),
  nameTransporter: optionalRule,
  distributors: createRule(ARRAY),
  isSubmitting: optionalRule,
  failed: optionalRule
};

/**
 * New user rules
 * @type {Object}
 */
const newUser = {
  username: createRule(),
  password: createRule(),
  fullname: createRule(),
  type: createRule()
};

/**
 * Login.
 * @type {Object}
 */
const login = {
  username: createRule(),
  password: createRule(),
  rememberMe: optionalRule
};

/**
 * Reducer initial state.
 * @type {Object}
 */
const initialState = {
  login,
  newUser,
  usersFilter,
  transporterForm,
  distributorForm,
  packageReceptionForm,
  assignOrdersForm
};

//
// Handlers.
// -----------------------------------------------------------------------------

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
