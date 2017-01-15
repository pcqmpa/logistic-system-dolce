/**
 * Module with server specific Observables.
 * @module src/server/api-server
 */
// Rxjs.
import { Observable } from 'rxjs/Observable';

// Node.
import request from 'request';

/**
 * Creates an Observable of an Ajax request.
 * @param {String} method -> The request method.
 * @param {String} url -> The service url.
 * @param {Object} body -> The request body.
 * @returns {Observable} -> The Ajax request.
 */
const fromAjaxRequest = (method, url, body = {}) => (
  Observable.create((observer) => {
    let reject = false;
    request({
      method,
      body,
      uri: url,
      json: true
    }, (err, response, reqBody) => {
      if (err) {
        return observer.error(err);
      }

      if (!reject) {
        try {
          const data = reqBody;
          observer.next(data);
        } catch (error) {
          observer.error(error);
        }
      }
      return observer.complete();
    });
      // .on('data', (response) => {
      //   console.log(response.toString());
      //   if (!reject) {
      //     try {
      //       const data = JSON.parse(response.toString());
      //       observer.next(data);
      //     } catch (err) {
      //       observer.error(err);
      //     }
      //   }
      //   observer.complete();
      // })
      // .on('error', (err) => {
      //   observer.error(err);
      // });

    return function dispose() {
      reject = true;
    };
  })
);

export default { fromAjaxRequest };
