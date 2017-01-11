/**
 * Module with the root redux-observable epic.
 * @module src/shared/epics/
 */
import { combineEpics } from 'redux-observable';

// Epics.
import login from './login-epic';
import logout from './logout-epic';
import addUser from './add-user-epic';

const rootEpic = combineEpics(
  login,
  logout,
  addUser
);

export default rootEpic;
