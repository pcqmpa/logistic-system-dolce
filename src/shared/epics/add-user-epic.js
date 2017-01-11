/**
 * Module with the add new user epic.
 * @module src/shared/epics/add-user-epic.
 */
// Rxjs.
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeMap';

// Lib.
import serializer from '../lib/serializer';

// Actions.
import {
  updateUsersList,
  addNewUserSuccess,
  addNewUserFailed
} from '../actions/users-actions';
import { addToast, removeToast } from '../actions/toast-list-actions';
import { showLoading, hideLoading } from '../actions/loading-actions';

// API services.
import {
  callAddUser,
  callConsultUsers
} from '../utils/api-service-creators';

// Constants.
import { ERROR, BRAND } from '../constants/types';
import { ADD_NEW_USER_REQUEST } from '../constants/actions';

const registerNewUserSuccess = (payload) => {
  const { message } = payload.response;
  const toast = addToast({ type: BRAND, message });
  return Observable.ajax
    .getJSON(callConsultUsers())
    .mergeMap(users => (
      Observable.concat(
        Observable.of(updateUsersList(users.data)),
        Observable.of(
          addNewUserSuccess(),
          hideLoading(),
          toast
        ),
        Observable.of(removeToast(toast.message.id))
          .delay(4000)
      )
    ));
};

const registerNewUserFailed = (payload) => {
  const { err } = payload.xhr.response;
  const toast = addToast({ type: ERROR, message: err });
  return Observable.concat(
    Observable.of(
      addNewUserFailed(),
      hideLoading(),
      toast
    ),
    Observable.of(removeToast(toast.message.id))
      .delay(4000)
  );
};

const addUserEpic = (action$, store) => (
  action$.ofType(ADD_NEW_USER_REQUEST)
    .mergeMap(() => (
      Observable.ajax
        .post(
          callAddUser(),
          serializer.toNewUser(store.getState().users.newUser)
        )
        .concatMap(response => (registerNewUserSuccess(response)))
        .catch(err => (registerNewUserFailed(err)))
        .startWith(showLoading())
    ))
);

export default addUserEpic;
