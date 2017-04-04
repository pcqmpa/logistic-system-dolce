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

// Actions.
import {
  updateUsersList,
  addNewUserSuccess,
  addNewUserFailed
} from '../actions/users-actions';
import { addToast } from '../actions/toast-list-actions';
import { showLoading, hideLoading } from '../actions/loading-actions';
import { updateDistributorFormList } from '../actions/transporters-actions';

// API services.
import {
  callAddUser,
  callConsultUsers
} from '../utils/api-service-creators';

// Lib.
import serializer from '../lib/serializer';

// Constants.
import { ERROR, BRAND } from '../constants/types';
import { ADD_NEW_USER_REQUEST } from '../constants/actions';

const registerNewUserSuccess = (payload) => {
  const { message } = payload.response;
  return Observable.ajax
    .getJSON(callConsultUsers())
    .mergeMap(users => (
      Observable.concat(
        Observable.of(updateUsersList(users.data)),
        Observable.of(updateDistributorFormList(
          serializer.toDistributorUsers(users)
        )),
        Observable.of(
          addNewUserSuccess(),
          hideLoading()
        ),
        Observable.of(addToast({ type: BRAND, message }))
          .delay(200)
      )
    ));
};

const registerNewUserFailed = (payload) => {
  const { err } = payload.xhr.response;
  return Observable.concat(
    Observable.of(
      addNewUserFailed(),
      hideLoading()
    ),
    Observable.of(addToast({ type: ERROR, message: err }))
      .delay(200)
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
