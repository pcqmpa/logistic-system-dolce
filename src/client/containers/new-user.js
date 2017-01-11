/**
 * Module with the new user container component.
 * @module src/client/containers/new-user
 */
// React - Redux.
import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

// Components.
import {
  Grid,
  GridCell,
  Button,
  InputBox,
  SelectBox,
  BoxContainer
} from '../components/';

// Lib.
import validator from '../../shared/lib/validator';

// Actions.
import {
  updateNewUser,
  addNewUserRequest
} from '../../shared/actions/users-actions';
import { updateRulesValidation } from '../../shared/actions/form-rules-actions';

// Constants.
import {
  BRAND,
  SUBMIT,
  MEDIUM_SIZE
} from '../../shared/constants/types';
import {
  USERNAME,
  PASSWORD,
  FULLNAME,
  USER_TYPE,
  USERNAME_INPUT,
  PASSWORD_INPUT,
  FULLNAME_INPUT,
  USER_TYPE_INPUT,
  NEW_USER_RULES
} from '../constants/strings';
import { USERS_LIST } from '../../shared/constants/routes';
import { ADMIN } from '../../shared/constants/user-types';

class NewUser extends Component {
  static propTypes = {
    types: PropTypes.arrayOf(PropTypes.object),
    actions: PropTypes.shape(),
    newUser: PropTypes.shape(),
    formRules: PropTypes.shape()
  };

  /**
   * Maps the current list of user types to match the SelectBox signature.
   * @private
   * @param {Array} types -> The current list of user types.
   * @returns {Array} -> The mapped user types.
   */
  mapUserTypes = types => (
    types
      .filter(type => (type.Id !== ADMIN))
      .map(type => ({
        value: type.Id,
        text: type.StrNombre
      }))
  );

  /**
   * Submits the add new user form.
   * @private
   * @param {Object} event -> The event object.
   * @returns {void} ->
   */
  addNewUser = (event) => {
    event.preventDefault();
    const { newUser, formRules } = this.props;
    const formValidation = validator.run(formRules, newUser);
    this.props.actions.updateRulesValidation(
      NEW_USER_RULES,
      formValidation.resume
    );

    if (formValidation.valid) {
      this.props.actions.addNewUserRequest();
    }
  };

  /**
   * Updates the data form.
   * @private
   * @param {String} input -> The target input.
   * @param {Object} event -> The event object.
   * @returns {void} ->
   */
  handleInputChanges = input => (event) => {
    const { value } = event.target;
    this.props.actions.updateNewUser({ input, value });
  };

  /**
   * Cancel new register and return to users list.
   * @private
   * @param {Object} event -> The event object.
   * @returns {void} ->
   */
  cancelRegister = (event) => {
    event.preventDefault();
    this.props.actions.replace(USERS_LIST);
  };

  render() {
    const {
      types,
      newUser,
      formRules
    } = this.props;

    return (
      <BoxContainer
        pillar
        size={MEDIUM_SIZE}
      >
        <h2 className="c-heading">Nuevo Usuario</h2>
        <Grid noGutter>
          <GridCell width={50}>
            <form action="#" onSubmit={this.addNewUser}>
              <InputBox
                id={`${USERNAME}_input`}
                name={`${USERNAME}_input`}
                label={USERNAME_INPUT}
                placeholder={USERNAME_INPUT}
                valid={formRules.username.valid}
                value={newUser.username}
                onChange={this.handleInputChanges(USERNAME)}
              />
              <InputBox
                type={PASSWORD}
                id={`${PASSWORD}_input`}
                name={`${PASSWORD}_input`}
                label={PASSWORD_INPUT}
                placeholder={PASSWORD_INPUT}
                valid={formRules.password.valid}
                value={newUser.password}
                onChange={this.handleInputChanges(PASSWORD)}
              />
              <InputBox
                id={`${FULLNAME}_input`}
                name={`${FULLNAME}_input`}
                label={FULLNAME_INPUT}
                placeholder={FULLNAME_INPUT}
                valid={formRules.fullname.valid}
                value={newUser.fullname}
                onChange={this.handleInputChanges(FULLNAME)}
              />
              <SelectBox
                id={`${USER_TYPE}_input`}
                name={`${USER_TYPE}_input`}
                label={USER_TYPE_INPUT}
                placeholder={USER_TYPE_INPUT}
                valid={formRules.type.valid}
                value={newUser.type}
                options={this.mapUserTypes(types)}
                onChange={this.handleInputChanges(USER_TYPE)}
              />
              <Grid noGutter>
                <GridCell width={30}>
                  <Button
                    block
                    id="submit_new_user"
                    type={SUBMIT}
                    theme={BRAND}
                    size={MEDIUM_SIZE}
                  >
                    Registrar
                  </Button>
                </GridCell>
                <GridCell width={30} offset={5}>
                  <Button
                    block
                    id="button_cancel_register"
                    size={MEDIUM_SIZE}
                    onClick={this.cancelRegister}
                  >
                    Cancelar
                  </Button>
                </GridCell>
              </Grid>
            </form>
          </GridCell>
        </Grid>
      </BoxContainer>
    );
  }
}

export default connect(
  state => ({
    types: state.users.types,
    newUser: state.users.newUser,
    formRules: state.formRules.newUser
  }),
  dispatch => ({
    actions: bindActionCreators({
      replace,
      updateNewUser,
      addNewUserRequest,
      updateRulesValidation
    }, dispatch)
  })
)(NewUser);
