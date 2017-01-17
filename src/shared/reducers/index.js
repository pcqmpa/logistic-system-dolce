/**
 * Module with the app root reducer.
 * @module src/shared/reducers/
 */
// Redux.
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers.
import formRules from './form-rules';
import dataTable from './data-table-reducer';
import user from './user-reducer';
import users from './users-reducer';
import transporters from './transporters-reducer';
import toastList from './toast-list-reducer';
import loading from './loading';
import loginForm from './login-form';
import dashboard from './dashboard-reducer';
import packageReception from './package-reception';

// Root Reducer.
export default combineReducers({
  routing: routerReducer,
  formRules,
  dataTable,
  user,
  users,
  transporters,
  toastList,
  loading,
  loginForm,
  dashboard,
  packageReception
});
