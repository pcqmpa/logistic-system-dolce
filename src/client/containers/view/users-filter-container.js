/**
 * Module with the users list filter container.
 * @module src/client/containers/view/users-filter
 */
// React.
import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components.
import { UsersFilter } from '../../components/';

// Actions.
import { updateUsersFilter, clearUsersFilter } from '../../../shared/actions/users-actions';

class UsersFilterContainer extends Component {
  static propTypes = {
    types: PropTypes.arrayOf(PropTypes.object),
    usersFilter: PropTypes.shape(),
    actions: PropTypes.shape()
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
    const { types, usersFilter } = this.props;
    return (
      <UsersFilter
        types={this.mapUserTypes(types)}
        filter={usersFilter}
        onFilterChanges={this.handleFilterChanges}
        onClearFilter={this.clearFilterInputs}
      />
    );
  }
}

export default connect(
  state => ({ ...state.users }),
  dispatch => ({
    actions: bindActionCreators({
      updateUsersFilter,
      clearUsersFilter
    }, dispatch)
  })
)(UsersFilterContainer);
