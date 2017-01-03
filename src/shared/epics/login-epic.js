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
import { updateUsersList } from '../actions/users-actions';

// API services.
import { callFetchUser } from '../utils/api-service-creators';

// Constants.
import { DASHBOARD } from '../constants/routes';
import { LOGIN_REQUEST } from '../constants/actions';
import { ERROR, BRAND } from '../constants/types';
// import { INVALID_USER } from '../constants/messages';

const loginSuccessEpic = (payload) => {
  console.log(payload);
  const toast = addToast({ type: BRAND, message: 'Bienvenido' });
  // TODO: uncomment this
  // if (!payload.LogEstado) {
  //   throw new Error(INVALID_USER);
  // }
  return Observable.merge(
    Observable.of(loginSuccess(payload.user)),
    Observable.of(updateUsersList(payload.users)),
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
