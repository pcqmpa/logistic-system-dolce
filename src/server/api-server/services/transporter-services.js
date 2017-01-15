/**
 * Module with the transporter services.
 * @module src/server/api-server/services/transporter-services
 */
// API Creators.
import {
  getTransporters,
  assignTransporter,
  assignDistributor
} from './service-creators';

// Utils.
import { streams } from '../../utils/';

// Constants.
import { GET, POST } from '../../../shared/constants/types';

/**
 * Creates a request consulting the list of transporter masters.
 * @returns {Symbol.Observable} -> The request.
 */
const getTransportersRequest = () => (
  streams.fromAjaxRequest(GET, getTransporters())
);

/**
 * Creates a request to assign a user to a transporter master.
 * @param {String} idUser -> The transporter user id.
 * @param {String} idTranporter -> The transporter master id.
 * @returns {Symbol.Observable} -> The request.
 */
const assignTransporterRequest = (idUser, idTranporter) => (
  streams.fromAjaxRequest(
    POST,
    assignTransporter(),
    { idUsuario: idUser, idTranportador: idTranporter }
  )
);

/**
 * Creates a request to assign a distributor user to a transporter user.
 * @param {String} idTranporter -> The transporter user id.
 * @param {String} idDistributor -> The distributor user id.
 * @returns {Symbol.Observable} -> The request.
 */
const assignDistributorRequest = (idTranporter, idDistributor) => (
  streams.fromAjaxRequest(
    POST,
    assignDistributor(),
    { idTransportista: idTranporter, idDistribuidor: idDistributor }
  )
);

export default {
  getTransportersRequest,
  assignTransporterRequest,
  assignDistributorRequest
};
