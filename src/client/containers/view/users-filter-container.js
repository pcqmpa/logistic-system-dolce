/**
 * Module with the users list filter container.
 * @module src/client/containers/view/users-filter
 */
// React - Redux.
import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Components.
import { UsersFilter } from '../../components/';

// Actions.
import { updateUsersFilter, clearUsersFilter } from '../../../shared/actions/users-actions';

// Constants.
import { NEW_USER } from '../../../shared/constants/routes';

class UsersFilterContainer extends Component {
  static propTypes = {
    types: PropTypes.arrayOf(PropTypes.object),
    usersFilter: PropTypes.shape(),
    actions: PropTypes.shape(),
    formRules: PropTypes.shape()
  };

  /**
   * Handles the update of the filer inputs.
   * @private
   * @param {String} filter -> The type of the filter.
   * @param {Object} event -> The input event object.
   * @returns {void} ->
   */
  handleFilterChanges = filter => (event) => {
    const { value } = event.target;
    this.props.actions.updateUsersFilter({ filter, value });
  };

  /**
   * Redirects to the new user form.
   * @private
   * @returns {void} ->
   */
  linkToNewUser = () => {
    this.props.actions.push(NEW_USER);
  };

  /**
   * Clear the filter inputs.
   * @private
   * @returns {void} ->
   */
  clearFilterInputs = () => {
    this.props.actions.clearUsersFilter();
  };

  /**
   * Maps the current list of user types to match the SelectBox signature.
   * @private
   * @param {Array} types -> The current list of user types.
   * @returns {Array} -> The mapped user types.
   */
  mapUserTypes = types => (
    types.map(type => ({
      value: type.Id,
      text: type.StrNombre
    }))
  );

  render() {
    const {
      types,
      usersFilter,
      formRules
    } = this.props;

    return (
      <UsersFilter
        rules={formRules}
        types={this.mapUserTypes(types)}
        filter={usersFilter}
        onFilterChanges={this.handleFilterChanges}
        onClearFilter={this.clearFilterInputs}
        linkToNewUser={this.linkToNewUser}
      />
    );
  }
}

export default connect(
  state => ({
    ...state.users,
    formRules: state.formRules.usersFilter
  }),
  dispatch => ({
    actions: bindActionCreators({
      updateUsersFilter,
      clearUsersFilter,
      push
    }, dispatch)
  })
)(UsersFilterContainer);
