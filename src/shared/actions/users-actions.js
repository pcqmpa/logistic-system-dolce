/**
 * Module with the users reducer actions.
 * @module src/shared/actions/users-actions
 */
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


// New User Actions.
export const updateNewUser = data => ({ type: UPDATE_NEW_USER, data });

export const addNewUserRequest = () => ({ type: ADD_NEW_USER_REQUEST });

export const addNewUserSuccess = () => ({ type: ADD_NEW_USER_SUCCESS });

export const addNewUserFailed = () => ({ type: ADD_NEW_USER_FAILED });

// Edit User Actions.
export const selectUserToEdit = userId => ({ type: SELECT_USER_TO_EDIT, userId });

export const clearUserToEdit = () => ({ type: CLEAR_USER_TO_EDIT });

// Users Filter.
export const updateUsersFilter = data => ({ type: UPDATE_USERS_FILTER, data });

export const clearUsersFilter = () => ({ type: CLEAR_USERS_FILTER });

