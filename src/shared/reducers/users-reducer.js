/**
 * Module with the users reducer.
 * @module src/shared/reducers/users-reducer
 */
import { createReducer } from 'redux-create-reducer';

// Helpers.
import { array } from '../utils/';

// Actions.
import {
  UPDATE_NEW_USER_FORM,
  ADD_NEW_USER_REQUEST,
  ADD_NEW_USER_SUCCESS,
  ADD_NEW_USER_FAILED,
  SELECT_USER_TO_EDIT,
  CLEAR_USER_TO_EDIT,
  UPDATE_USERS_LIST,
  UPDATE_USERS_FILTER,
  CLEAR_USERS_FILTER,
  UPDATE_USER_TYPES
} from '../constants/actions';

// New User Object.
const newUser = {
  username: '',
  password: '',
  fullname: '',
  type: '',
  isSubmitting: false
};

// Users filter.
const usersFilter = {
  fullname: '',
  type: ''
};

const initialState = {
  list: [],
  newUser,
  editUser: null,
  usersFilter,
  types: []
};

/**
 * Users action handlers.
 * @type {Object}
 */
const actionHandlers = {
  [UPDATE_NEW_USER_FORM]: (state, { input, value }) => ({
    ...state,
    newUser: {
      ...state.newUser,
      [input]: (value === 'none') ? '' : value
    }
  }),
  [ADD_NEW_USER_REQUEST]: state => ({
    ...state,
    isSubmitting: true
  }),
  [ADD_NEW_USER_SUCCESS]: state => ({
    ...state,
    newUser
  }),
  [ADD_NEW_USER_FAILED]: state => ({
    ...state,
    newUser
  }),
  [SELECT_USER_TO_EDIT]: (state, { userId }) => ({
    ...state,
    editUser: array.get(
      state.users
        .filter(user => (user.IdUsuario === userId))
    )
  }),
  [CLEAR_USER_TO_EDIT]: state => ({
    ...state,
    editUser: false
  }),
  [UPDATE_USERS_LIST]: (state, { users }) => ({
    ...state,
    list: users
  }),
  [UPDATE_USERS_FILTER]: (state, { filter, value }) => ({
    ...state,
    usersFilter: {
      ...state.usersFilter,
      [filter]: value
    }
  }),
  [CLEAR_USERS_FILTER]: state => ({
    ...state,
    usersFilter
  }),
  [UPDATE_USER_TYPES]: (state, { types }) => ({
    ...state,
    types
  })
};

export default createReducer(initialState, actionHandlers);
