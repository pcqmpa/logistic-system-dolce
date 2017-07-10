/**
 * Module with server specific Observables.
 * @module src/server/api-server
 */
// Node.
import fs from 'fs';
import request from 'request';
import shortId from 'shortid';
// import { decode } from 'node-base64-image';
// import base64Img from 'base64-img';

// Rxjs.
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/bindNodeCallback';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// Constants.
import { POST, PATCH } from '../../shared/constants/types';

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
    const requestData = {
      method,
      uri: url,
      headers: {
        'User-Agent': 'request',
        'content-type': 'application/json'
      }
    };

    if (method === POST || method === PATCH) {
      requestData.body = body;
      requestData.json = true;
    }

    request(requestData, (err, response, reqBody) => {
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
 * @returns {Observable} -> The stream to process the image.
 */
const fromBase64ToImage = (image, imageData) => {
  const { filePath, extension } = imageData;
  const base64Image = image.replace(/^data:image\/jpeg;base64,/, '');
  const buffer = Buffer.from(base64Image, 'base64');
  const imageKey = shortId.generate();
  const filename = `${filePath}/${imageKey}.${extension}`;
  const storedPath = `${imageKey}.${extension}`;

  const writeImage$ = Observable
    .bindNodeCallback(fs.writeFile)(filename, buffer)
    .map(() => (storedPath))
    .catch((err) => {
      fs.unlinkSync(filename);
      throw new Error(err);
    });

  return writeImage$;
};

const fromBufferToImage = (image, options) => {
  const { buffer } = image;
  const { filePath, extension } = options;
  const imageKey = shortId.generate();
  const filename = `${filePath}/${imageKey}.${extension}`;
  const storedPath = `${imageKey}.${extension}`;

  const writeImage$ = Observable
    .bindNodeCallback(fs.writeFile)(filename, buffer)
    .map(() => (storedPath))
    .catch((err) => {
      fs.unlinkSync(filename);
      throw new Error(err);
    });

  return writeImage$;
};

export default {
  fromAjaxRequest,
  fromBase64ToImage,
  fromBufferToImage
};
