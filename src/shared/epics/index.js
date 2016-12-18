/**
 * Module with the root redux-observable epic.
 * @module src/shared/epics/
 */
import { combineEpics } from 'redux-observable';

// Epics.
import loginEpic from './login-epic';
import logoutEpic from './logout-epic';

const rootEpic = combineEpics(
  loginEpic,
  logoutEpic,
);

export default rootEpic;
