/**
 * Module with the users reducer actions.
 * @module src/shared/actions/users-actions
 */
// Constants.
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


// New User Actions.
export const updateNewUser = ({ input, value }) => ({
  type: UPDATE_NEW_USER_FORM,
  input,
  value
});

export const addNewUserRequest = () => ({ type: ADD_NEW_USER_REQUEST });

export const addNewUserSuccess = () => ({ type: ADD_NEW_USER_SUCCESS });

export const addNewUserFailed = () => ({ type: ADD_NEW_USER_FAILED });

// Edit User Actions.
export const selectUserToEdit = userId => ({ type: SELECT_USER_TO_EDIT, userId });

export const clearUserToEdit = () => ({ type: CLEAR_USER_TO_EDIT });

// Users actions.
export const updateUsersList = users => ({ type: UPDATE_USERS_LIST, users });

export const updateUsersFilter = ({ filter, value }) => ({
  type: UPDATE_USERS_FILTER,
  filter,
  value
});

export const clearUsersFilter = () => ({ type: CLEAR_USERS_FILTER });

export const updateUserTypes = types => ({ type: UPDATE_USER_TYPES, types });
