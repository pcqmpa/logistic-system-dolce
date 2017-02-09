/**
 * Module with the packages reception epic.
 * @module src/shared/epics/package-reception-epic.
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
  packageReceptionSuccess,
  packageReceptionFailed
} from '../actions/package-reception-actions';
import {
  toggleDataTableElements
} from '../actions/data-table-actions';
import { addToast, removeToast } from '../actions/toast-list-actions';
import { showLoading, hideLoading } from '../actions/loading-actions';

// API services.
import {
  callCheckOrder
} from '../utils/api-service-creators';

// Constants.
import { ERROR, BRAND } from '../constants/types';
import { PACKAGE_RECEPTION_REQUEST } from '../constants/actions';
import { PACKAGE_RECEPTION_FORM } from '../constants/strings';

const packageReceptionRequestSuccess = (payload) => {
  const { message } = payload.response;
  const toast = addToast({ type: BRAND, message });
  return Observable.concat(
    Observable.of(
      packageReceptionSuccess(),
      toggleDataTableElements(
        PACKAGE_RECEPTION_FORM,
        false
      ),
      hideLoading(),
      toast
    ),
    Observable.of(removeToast(toast.message.id))
      .delay(4000)
  );
};

const packageReceptionRequestFailed = (payload) => {
  const { err } = payload.xhr.response;
  const toast = addToast({ type: ERROR, message: err });
  return Observable.concat(
    Observable.of(
      packageReceptionFailed(),
      hideLoading(),
      toast
    ),
    Observable.of(removeToast(toast.message.id))
      .delay(4000)
  );
};

const requestBatch = (data) => {
  const { ordersList, observation } = data;
  return Observable.from(
    ordersList.filter(order => (order.checked))
  )
    .mergeMap(order => (
      Observable.ajax.post(
        callCheckOrder(),
        { numOrder: order.NumPedido, observation }
      )
    ))
    .reduce((message, response) => (response));
};

const packageReceptionEpic = (action$, store) => (
  action$.ofType(PACKAGE_RECEPTION_REQUEST)
    .mergeMap(() => (
      requestBatch(
        store.getState().packageReception
      )
        .concatMap(response => (packageReceptionRequestSuccess(response)))
        .catch(err => (packageReceptionRequestFailed(err)))
        .startWith(showLoading())
    ))
);

export default packageReceptionEpic;
