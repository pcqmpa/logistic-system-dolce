/**
 * Module with the security external services.
 * @module src/server/api-server/services/security-services
 */
// API Creators.
import { fetchUser } from './service-creators';

// Streams.
import { streams } from '../../utils/';

// Constants.
import { GET } from '../../../shared/constants/types';

/**
 * Creates a request fetching a user with payload data.
 * @param {Object} payload -> The request payload.
 * @returns {Observable} -> The request.
 */
const fetchUserRequest = payload => (
  streams.fromAjaxRequest(GET, fetchUser(payload))
);

export default { fetchUserRequest };
