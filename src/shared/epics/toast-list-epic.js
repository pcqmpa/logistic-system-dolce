/**
 * Module with the toast epic.
 * @module src/shared/epics/toast-epic
 */
 // Rxjs.
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/delay';

// Actions.
import { removeToast } from '../actions/toast-list-actions';

// Constants.
import { ADD_TOAST } from '../constants/actions';

/**
 * Epic to handle each toast adition.
 * @param {Object} $action -> The Redux action wrapped.
 * @returns {Symbol.Observable} -> The epic definition.
 */
const toastListEpic = $action => (
  $action.ofType(ADD_TOAST)
    .concatMap(action => (
      Observable.of(removeToast(action.message.id))
        .delay(3000)
    ))
);

export default toastListEpic;
