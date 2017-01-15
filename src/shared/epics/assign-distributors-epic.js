/**
 * Module with the assign transporter epic.
 * @module src/shared/epics/assign-transporter-epic.
 */
// Rxjs.
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/reduce';

// Actions.
import {
  assignDistributorSuccess,
  assignDistributorFailed
} from '../actions/transporters-actions';
import { addToast, removeToast } from '../actions/toast-list-actions';
import { showLoading, hideLoading } from '../actions/loading-actions';

// API services.
import {
  callAssignDistributor
} from '../utils/api-service-creators';

// Constants.
import { ERROR, BRAND } from '../constants/types';
import { ASSIGN_DISTRIBUTOR_REQUEST } from '../constants/actions';

const assignDistributorsRequestSuccess = (payload) => {
  const { message } = payload.response;
  const toast = addToast({ type: BRAND, message });
  return Observable.concat(
    Observable.of(
      assignDistributorSuccess(),
      hideLoading(),
      toast
    ),
    Observable.of(removeToast(toast.message.id))
      .delay(4000)
  );
};

const assignDistributorsRequestFailed = (payload) => {
  const { err } = payload.xhr.response;
  const toast = addToast({ type: ERROR, message: err });
  return Observable.concat(
    Observable.of(
      assignDistributorFailed(),
      hideLoading(),
      toast
    ),
    Observable.of(removeToast(toast.message.id))
      .delay(4000)
  );
};

const requestBatch = (form) => {
  const { idTransporter, distributors } = form;
  return Observable.from(
    distributors.filter(distributor => (distributor.assign))
  )
    .mergeMap(distributor => (
      Observable.ajax.post(
        callAssignDistributor(),
        { idTransporter, idDistributor: distributor.id }
      )
    ))
    .reduce((message, response) => (response));
};

const assignDistributorsEpic = (action$, store) => (
  action$.ofType(ASSIGN_DISTRIBUTOR_REQUEST)
    .mergeMap(() => (
      requestBatch(
        store.getState().transporters.distributorForm
      )
        .concatMap(response => (assignDistributorsRequestSuccess(response)))
        .catch(err => (assignDistributorsRequestFailed(err)))
        .startWith(showLoading())
    ))
);

export default assignDistributorsEpic;
