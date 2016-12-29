/**
 * Module with the users list container component.
 * @module src/client/containers/users-list
 */
// React.
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';

// Components.
import { BoxContainer } from '../components/';

// Constants.
import { MEDIUM_SIZE } from '../../shared/constants/types.js';

class UsersList extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.object),
    editUSer: PropTypes.shape(),
    usersFilter: PropTypes.shape()
  };

  render() {
    return (
      <BoxContainer
	 letter
	 size={MEDIUM_SIZE}
      >
	<h1 className="c-heading">Usuarios</h1>
      </BoxContainer>
    );
  }
}

export default connect(
  state => ({ ...state.users })
)(UsersList);
