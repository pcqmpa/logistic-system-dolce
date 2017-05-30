/**
 * Module with the Authentication middleware of the server.
 * @module src/server/middlewares/auth-middleware
 */
// Node.
import jwt from 'jsonwebtoken';

// App Config.
import { TOKEN_SECRET } from '../../../config/';

// Constants.
import { UNAUTHORIZED } from '../constants/responses';
import { UNAUTHORIZED_USER } from '../../shared/constants/messages';

const isPrivateUrl = currentUrl => (
  currentUrl !== '/api/callFetchUser' ||
  currentUrl !== '/api/destroyUserSession' ||
  currentUrl !== '/api/callAuthMobileUser'
);

const validateAuthentication = (req, res, next) => {
  const {
    isMobile,
    token
  } = req.headers;

  if (isMobile && isPrivateUrl(req.originalUrl)) {
    return jwt.verify(token, TOKEN_SECRET, (err) => {
      if (err) {
        return res
          .status(UNAUTHORIZED)
          .send({ message: UNAUTHORIZED_USER });
      }

      return next();
    });
  }

  return next();
};

const authMiddleware = (app) => {
  app.use(validateAuthentication);
};

export default authMiddleware;
