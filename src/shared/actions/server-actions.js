/**
 * Module with the server specific actions.
 * @module src/shared/actions/server-actions
 */
// Constants.
import { INIT_ADMIN_STATE } from '../constants/actions';

export const initAdminState = () => ({ type: INIT_ADMIN_STATE }); // eslint-disable-line
