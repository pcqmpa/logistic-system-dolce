/**
 * Module with the Status component.
 * @module src/shared/components/status
 */
// React - Router.
import React, { PropTypes } from 'react';
import { Route } from 'react-router';

/**
 * The Status component which handles any http status code.
 * @returns {ReactElement} -> The react component.
 */
const Status = ({ children, code }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        // Removed linter validation due to third party code.
        staticContext.status = code; // eslint-disable-line
      }

      return children;
    }}
  />
);

/**
 * The component proptypes.
 * @type {Object}
 * @property {ReactElement} children -> The components the status will render.
 @ @property {Number} code -> The http response code.
 */
Status.propTypes = {
  children: PropTypes.node.isRequired,
  code: PropTypes.number.isRequired
};

export default Status;
