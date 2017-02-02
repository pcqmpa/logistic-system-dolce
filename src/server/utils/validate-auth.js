/**
 * Module with a simple jsonwebtoken validation.
 * @module src/server/utils/validate-auth
 */

import jwt from 'jsonwebtoken';

// App Config.
import { TOKEN_SECRET } from '../../../config/';

/**
 * It will check for a token in session and validates the expiration date.
 * @param {Object} session -> The session object.
 * @returns {Object} -> The user object.
 */
const validateAuth = (session) => {
  const defaultResponse = { user: null };
  const { token } = session;
  if (!token) {
    return defaultResponse;
  }

  // Verify token.
  try {
    return jwt.verify(token, TOKEN_SECRET);
  } catch (err) {
    return defaultResponse;
  }
};

export default validateAuth;
