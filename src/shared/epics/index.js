/**
 * Module with the root redux-observable epic.
 * @module src/shared/epics/
 */
import { combineEpics } from 'redux-observable';

// Epics.
import login from './login-epic';
import logout from './logout-epic';
import addUser from './add-user-epic';
import assignTransporter from './assign-transporter-epic';
import assignDistributors from './assign-distributors-epic';
import packageReception from './package-reception-epic';

const rootEpic = combineEpics(
  login,
  logout,
  addUser,
  assignTransporter,
  assignDistributors,
  packageReception
);

export default rootEpic;
