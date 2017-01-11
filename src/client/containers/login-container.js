/**
 * Module with the login container component.
 * @module src/shared/actions/users-actions
 */
import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions.
import {
  updateUsername,
  updatePassword,
  toggleRememberMe
} from '../../shared/actions/login-form-actions';
import { requestLogin } from '../../shared/actions/user-actions';
import { updateRulesValidation } from '../../shared/actions/form-rules-actions';

// Components.
import { Login } from '../components/';

// Lib.
import validator from '../../shared/lib/validator';

// Constants.
import {
  USERNAME,
  PASSWORD,
  LOGIN_RULES
} from '../constants/strings';

// Styles.
import '../styles/login-container.scss';

class LoginContainer extends Component {
  static propTypes = {
    actions: PropTypes.shape(),
    loginForm: PropTypes.shape(),
    formRules: PropTypes.shape()
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { loginForm, formRules } = this.props;
    const formValidation = validator.run(formRules, loginForm);
    console.log(formValidation);
    this.props.actions.updateRulesValidation(
      LOGIN_RULES,
      formValidation.resume
    );

    if (formValidation.valid) {
      this.props.actions.requestLogin(loginForm);
    }
  };

  handleInputChanges = (event) => {
    const type = event.target.dataset.group;
    const value = event.target.value;
    const { actions } = this.props;

    if (type === USERNAME) {
      actions.updateUsername(value);
    }

    if (type === PASSWORD) {
      actions.updatePassword(value);
    }
  };

  handleToggleRememberMe = () => {
    this.props.actions.toggleRememberMe();
  };

  render() {
    const {
      formRules,
      loginForm
    } = this.props;

    return (
      <div className="u-center-block login-container">
        <div className="u-center-block__content">
          <h1 className="c-heading">Por favor ingrese</h1>
          <Login
            rules={formRules}
            username={loginForm.username}
            password={loginForm.password}
            rememberMe={loginForm.rememberMe}
            handleSubmit={this.handleSubmit}
            handleInputChanges={this.handleInputChanges}
            handleToggleRememberMe={this.handleToggleRememberMe}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    loginForm: state.loginForm,
    formRules: state.formRules.login
  }),
  dispatch => ({
    actions: bindActionCreators({
      requestLogin,
      updateUsername,
      updatePassword,
      toggleRememberMe,
      updateRulesValidation
    }, dispatch)
  })
)(LoginContainer);
