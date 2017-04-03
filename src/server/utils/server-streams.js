/**
 * Module with server specific Observables.
 * @module src/server/api-server
 */
// Node.
import fs from 'fs';
import request from 'request';
import shortId from 'shortid';
import { decode } from 'node-base64-image';

// Rxjs.
import { Observable } from 'rxjs/Observable';

/**
 * Creates an Observable of an Ajax request.
 * @param {String} method -> The request method.
 * @param {String} url -> The service url.
 * @param {Object} body -> The request body.
 * @returns {Symbol.Observable} -> The Ajax request.
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

    return function dispose() {
      reject = true;
    };
  })
);

/**
 * Stream that converts a base64 image into a file.
 * @param {String} image -> The base64 image.
 * @param {String} imageName -> The name of the file.
 * @param {String} targetPath -> The path to save the file.
 * @returns {Symbol.Observable} -> The stream to process the image.
 */
const fromBase64ToImage = (imageString, imageData) => (
  Observable.create((observer) => {
    let reject = false;
    const { filePath, extension } = imageData;
    const buffer = new Buffer(imageString, 'base64');
    const imageKey = shortId.generate();
    const filename = `${filePath}/${imageKey}`;
    const storedPath = `${imageKey}.${extension}`;

    decode(buffer, { filename }, (err) => {
      if (err) {
        return observer.error(err);
      }

      if (reject) {
        fs.unlinkSync(storedPath);
      } else {
        observer.next(storedPath);
      }

      return observer.complete();
    });

    return function dispose() {
      reject = true;
    };
  })
);


export default {
  fromAjaxRequest,
  fromBase64ToImage
};
