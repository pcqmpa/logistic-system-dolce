/**
 * Module with the logout epic.
 * @module src/shared/epics/logout-epic.
 */
// React - Redux
import { routerActions } from 'react-router-redux';

// Rxjs.
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/delay';

// Actions.
import { logoutSuccess } from '../actions/user-actions';
import { showLoading, hideLoading } from '../actions/loading-actions';

// Constants
import { LOGOUT_REQUEST } from '../constants/actions';

// Routes.
import { LOGIN } from '../constants/routes';

// API services.
import { destroyUserSession } from '../utils/api-service-creators';

const logoutEpic = action$ =>
  action$.ofType(LOGOUT_REQUEST)
    .mergeMap(() => (
      Observable.ajax
        .post(destroyUserSession())
        .delay(3000)
        .concatMap(() => (
          Observable.of(
            logoutSuccess(),
            routerActions.push(LOGIN),
            hideLoading()
          )
        ))
        .startWith(showLoading())
    ));

export default logoutEpic;
