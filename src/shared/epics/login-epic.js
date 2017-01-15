// TODO: see if this can be refactor.
/**
 * Module with the login epic.
 * @module src/shared/epics/login-epic.
 */
 // React - Redux.
import { routerActions } from 'react-router-redux';

// Rxjs.
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

// Actions.
import { addToast, removeToast } from '../actions/toast-list-actions';
import { showLoading, hideLoading } from '../actions/loading-actions';
import { loginSuccess, loginFailed } from '../actions/user-actions';
import { updateUsersList, updateUserTypes } from '../actions/users-actions';
import {
  initTransporterList,
  updateDistributorFormList
} from '../actions/transporters-actions';
import { updateSerializedDataTable } from '../actions/data-table-actions';

// API services.
import { callFetchUser } from '../utils/api-service-creators';

// Constants.
import { DASHBOARD } from '../constants/routes';
import { LOGIN_REQUEST } from '../constants/actions';
import { ERROR, BRAND } from '../constants/types';
import { INVALID_USER, WELCOME } from '../constants/messages';
import { DISTRIBUTOR } from '../constants/user-types';
import {
  TRANSPORTER_FORM,
  DISTRIBUTOR_FORM
} from '../constants/strings';

const loginSuccessEpic = (payload) => {
  const toast = addToast({ type: BRAND, message: WELCOME });
  if (!payload.user.LogEstado) {
    throw new Error(INVALID_USER);
  }
  return Observable.merge(
    Observable.of(loginSuccess(payload.user)),
    Observable.of(
      updateUsersList(payload.users),
      updateUserTypes(payload.types),
      initTransporterList(payload.transporters),
      updateSerializedDataTable(
        TRANSPORTER_FORM,
        payload.transporters
      ),
      updateDistributorFormList(payload.users),
      updateSerializedDataTable(
        DISTRIBUTOR_FORM,
        payload.users.filter(rawUser => (rawUser.IdTipo === DISTRIBUTOR))
      )
    ),
    Observable.of(routerActions.push(DASHBOARD)),
    Observable.of(
      hideLoading(),
      toast
    ).delay(1000),
    Observable.of(removeToast(toast.message.id))
      .delay(5000)
  );
};

const loginFailEpic = (err) => {
  const toast = addToast({ type: ERROR, message: err.message });
  return Observable.merge(
    Observable.of(
      loginFailed(err),
      hideLoading(),
      toast
    ),
    Observable.of(removeToast(toast.message.id))
      .delay(6000)
  );
};

const loginEpic = action$ =>
  action$.ofType(LOGIN_REQUEST)
    .mergeMap(action => (
      Observable.ajax
        .getJSON(callFetchUser(action.payload))
        .delay(3000)
        .concatMap(payload => (loginSuccessEpic(payload)))
        .catch(err => (loginFailEpic(err)))
        .startWith(showLoading())
    ));

export default loginEpic;
