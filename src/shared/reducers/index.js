/**
 * Module with the app root reducer.
 * @module src/shared/reducers/
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers.
import user from './user';
import users from './users-reducer';
import toastList from './toast-list-reducer';
import loading from './loading';
import loginForm from './login-form';
import dashboard from './dashboard-reducer';
import packageReception from './package-reception';

// Root Reducer.
export default combineReducers({
  routing: routerReducer,
  user,
  users,
  toastList,
  loading,
  loginForm,
  dashboard,
  packageReception
});
