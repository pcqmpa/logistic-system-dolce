/**
 * Module with the configAuth HOC utility.
 * @module src/server/utils/configAuth
 */
// React - Redux - Router.
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

// Constants.
import { DASHBOARD, LOGIN } from '../../shared/constants/routes';
import { ALL_USERS } from '../../shared/constants/user-types';

const configAuth = (WrappedComponent, {
  userType = null,
  noAuth = false,
  home = false
}) => {
  const AuthComponent = ({
    user,
    match,
    ...props
  }) => {
    if (!user.isAuth && match.path !== LOGIN) {
      return (<Redirect to={LOGIN} />);
    }

    const userTypeNoMatch = (user.data && user.data.IdTipo !== userType);

    if ((userTypeNoMatch || noAuth) && user.isAuth && !home) {
      return (<Redirect to={DASHBOARD} />);
    }

    return (<WrappedComponent {...props} />);
  };

  AuthComponent.propTypes = {
    match: PropTypes.shape({
      path: PropTypes.string
    }),
    redirectAction: PropTypes.func,
    user: PropTypes.shape({
      isAuth: PropTypes.bool,
      IdTipo: PropTypes.number
    })
  };

  AuthComponent.defaultProps = {
    user: {
      data: { IdTipo: ALL_USERS }
    }
  };

  const mapStateToProps = state => ({
    user: state.user
  });

  return connect(
    mapStateToProps
  )(AuthComponent);
};

export default configAuth;
