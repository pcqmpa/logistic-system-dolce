// TODO: verify if this is needed in a controller.
/**
 * Module with the logistic types services.
 * @module src/server/api-services/services/logistic-types-creators
 */
// API creators.
import { consultLogisticTypes } from './service-creators';

// Streams.
import { streams } from '../../utils/';

// Constants.
import { GET } from '../../../shared/constants/types';

/**
 * Creates a request consulting the logistic types.
 * @returns {Observable} -> The request.
 */
const consultLogisticTypesRequest = () => (
  streams.fromAjaxRequest(GET, consultLogisticTypes())
);

export default { consultLogisticTypesRequest };
