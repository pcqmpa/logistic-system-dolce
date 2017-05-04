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

const configAuth = (WrappedComponent, {
  userType = null,
  noAuth = false,
  home = false
}) => {
  const AuthComponent = ({
    user,
    ...props
  }) => {
    if (!user.isAuth) {
      return (<Redirect to={LOGIN} />);
    }

    if ((user.data.IdTipo !== userType || noAuth) && user.isAuth && !home) {
      return (<Redirect to={DASHBOARD} />);
    }

    return (<WrappedComponent {...props} />);
  };

  AuthComponent.propTypes = {
    redirectAction: PropTypes.func,
    user: PropTypes.shape({
      isAuth: PropTypes.bool,
      IdTipo: PropTypes.number
    })
  };

  const mapStateToProps = state => ({
    user: state.user
  });

  return connect(
    mapStateToProps
  )(AuthComponent);
};

export default configAuth;
