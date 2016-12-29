/**
 * Module with the users reducer.
 * @module src/shared/reducers/users-reducer
 */
import { createReducer } from 'redux-create-reducer';

// Helpers.
import { array } from '../utils/';

// Actions.
import {
  UPDATE_NEW_USER,
  ADD_NEW_USER_REQUEST,
  ADD_NEW_USER_SUCCESS,
  ADD_NEW_USER_FAILED,
  SELECT_USER_TO_EDIT,
  CLEAR_USER_TO_EDIT,
  UPDATE_USERS_FILTER,
  CLEAR_USERS_FILTER
} from '../constants/actions';

// New User Object.
const newUser = {
  username: false,
  password: false,
  fullname: false,
  type: false
};

// Users filter.
const usersFilter = {
  fullname: false,
  type: false
};

const initialState = {
  users: [],
  newUser,
  editUser: null,
  usersFilter,
  isSubmitting: false
};

const actionHandlers = {
  [UPDATE_NEW_USER]: (state, { input, value }) => ({
    ...state,
    newUser: {
      ...state.newUser,
      [input]: value
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
  })
};

export default createReducer(initialState, actionHandlers);
