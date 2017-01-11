import React, { PropTypes } from 'react';

// Components.
import {
  InputBox,
  CheckBox,
  Button
} from '../';

// Constants.
import {
  USERNAME,
  PASSWORD
} from '../../constants/strings';

const Login = ({
  rules,
  username,
  password,
  rememberMe,
  handleSubmit,
  handleInputChanges,
  handleToggleRememberMe
}) => (
  <form action="#" onSubmit={handleSubmit}>
    <div className="o-form-element">
      <div className="c-input-group c-input-group--stacked">
        <div className="o-field">
          <InputBox
            id={`${USERNAME}_input`}
            name={`${USERNAME}_input`}
            value={username}
            group={USERNAME}
            onChange={handleInputChanges}
            valid={rules.username.valid}
            placeholder={'Nombre de usuario'}
          />
        </div>
        <div className="o-field">
          <InputBox
            type={PASSWORD}
            id={`${PASSWORD}_input`}
            name={`${PASSWORD}_input`}
            value={password}
            group={PASSWORD}
            onChange={handleInputChanges}
            valid={rules.password.valid}
            placeholder={'Contraseña'}
          />
        </div>
      </div>
    </div>
    <CheckBox
      name={'remember_me_input'}
      checked={rememberMe}
      onChange={handleToggleRememberMe}
    >
      Recordarme
    </CheckBox>
    <div className="o-form-element">
      <Button
        type={'submit'}
        classNames={'c-button--brand c-button--block'}
      >
        Ingresar
      </Button>
    </div>
  </form>
);

Login.propTypes = {
  rules: PropTypes.shape().isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  rememberMe: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChanges: PropTypes.func.isRequired,
  handleToggleRememberMe: PropTypes.func.isRequired
};

export default Login;
