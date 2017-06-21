/**
 * Module with the transporter services.
 * @module src/server/api-server/services/transporter-services
 */
// Rxjs.
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

// API Creators.
// import {
//   getTransporters,
//   assignTransporter,
//   assignDistributor
// } from './service-creators';

// Utils.
// import { streams } from '../../utils/';

// Constants.
// import { GET, POST } from '../../../shared/constants/types';

// TODO: Add the mocked services.

/**
 * Creates a request consulting the list of transporter masters.
 * @returns {Symbol.Observable} -> The request.
 */
const getTransportersRequest = () => (
  // streams.fromAjaxRequest(GET, getTransporters())
  Observable.empty()
);

/**
 * Creates a request to assign a user to a transporter master.
 * @param {String} idUser -> The transporter user id.
 * @param {String} idTranporter -> The transporter master id.
 * @returns {Symbol.Observable} -> The request.
 */
const assignTransporterRequest = () => (
  // streams.fromAjaxRequest(
  //   POST,
  //   assignTransporter(),
  //   { idUsuario: idUser, idTranportador: idTranporter }
  // )
  Observable.empty()
);

/**
 * Creates a request to assign a distributor user to a transporter user.
 * @param {String} idTranporter -> The transporter user id.
 * @param {String} idDistributor -> The distributor user id.
 * @returns {Symbol.Observable} -> The request.
 */
const assignDistributorRequest = () => (
  // streams.fromAjaxRequest(
  //   POST,
  //   assignDistributor(),
  //   { idTransportista: idTranporter, idDistribuidor: idDistributor }
  // )
  Observable.empty()
);

export default {
  getTransportersRequest,
  assignTransporterRequest,
  assignDistributorRequest
};
