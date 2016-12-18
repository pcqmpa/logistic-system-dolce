// API Creators.
import { fetchUser } from './service-creators';

// Streams.
import { streams } from '../utils/';

export const fetchUserRequest = payload => ( // eslint-disable-line import/prefer-default-export
  streams.fromGetRequest(fetchUser(payload))
);
