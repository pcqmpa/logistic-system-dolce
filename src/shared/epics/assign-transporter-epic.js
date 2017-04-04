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
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeMap';

// Actions.
import {
  assignTransporterSuccess,
  assignTransporterFailed
} from '../actions/transporters-actions';
import { addToast } from '../actions/toast-list-actions';
import { showLoading, hideLoading } from '../actions/loading-actions';

// API services.
import {
  callAssignTransporter
} from '../utils/api-service-creators';

// Constants.
import { ERROR, BRAND } from '../constants/types';
import { ASSIGN_TRANSPORTER_REQUEST } from '../constants/actions';

const assignTransporterRequestSuccess = (payload) => {
  const { message } = payload.response;
  return Observable.concat(
    Observable.of(
      assignTransporterSuccess(),
      hideLoading()
    ),
    Observable.of(addToast({ type: BRAND, message }))
      .delay(200)
  );
};

const assignTransporterRequestFailed = (payload) => {
  const { err } = payload.xhr.response;
  return Observable.concat(
    Observable.of(
      assignTransporterFailed(),
      hideLoading()
    ),
    Observable.of(addToast({ type: ERROR, message: err }))
      .delay(200)
  );
};

const assignTransporterEpic = (action$, store) => (
  action$.ofType(ASSIGN_TRANSPORTER_REQUEST)
    .mergeMap(() => (
      Observable.ajax
        .post(
          callAssignTransporter(),
          store.getState().transporters.transporterForm
        )
        .concatMap(response => (assignTransporterRequestSuccess(response)))
        .catch(err => (assignTransporterRequestFailed(err)))
        .startWith(showLoading())
    ))
);

export default assignTransporterEpic;
