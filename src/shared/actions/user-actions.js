import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from '../constants/actions';

export const requestLogin = payload => ({ type: LOGIN_REQUEST, payload });

export const loginSuccess = user => ({ type: LOGIN_SUCCESS, user });

export const loginFailed = err => ({ type: LOGIN_FAILED, err });

export const requestLogout = () => ({ type: LOGOUT_REQUEST });

export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });
