/**
 * Module with server specific Observables.
 * @module src/server/api-server
 */
import { Observable } from 'rxjs';

// Node.
import request from 'request';

/**
 * Creates an Observable of an Ajax request.
 * @param {String} method -> The request method.
 * @param {String} url -> The service url.
 * @param {Object} body -> The request body.
 * @returns {Observable} -> The Ajax request.
 */
const fromAjaxRequest = (method, url, body = null) => (
  Observable.create((observer) => {
    let reject = false;
    request({ method, body })
      .on('data', (response) => {
        if (!reject) {
          try {
            const data = JSON.parse(response.toString());
            observer.next(data);
          } catch (err) {
            observer.error(err);
          }
        }
        observer.complete();
      })
      .on('error', (err) => {
        observer.error(err);
      });

    return function dispose() {
      reject = true;
    };
  })
);

export default { fromAjaxRequest };
