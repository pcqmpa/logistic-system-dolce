/**
 * Module with server specific Observables.
 * @module src/server/api-server
 */
import { Observable } from 'rxjs';

// Node.
import request from 'request';

/**
 * Creates an Observable of a {Ajax get} request.
 * @param {String} url -> The service url.
 * @returns {Observable} -> The Ajax Get request.
 */
const fromGetRequest = url => (
  Observable.create((observer) => {
    let reject = false;
    request.get(url)
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

export default { fromGetRequest };
