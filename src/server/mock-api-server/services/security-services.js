/**
 * Module with the mocked security services.
 * @module src/server/mock-api-server/services/security-services
 */
// Utils.
import { mockedData } from '../../utils/';

/**
 * Simulates a distributor user request.
 * @param {Object} payload -> The request payload.
 * @returns {Observable} -> The request.
 */
const fetchUserRequest = payload => (
  mockedData.users[payload.username]
);

export default { fetchUserRequest };
