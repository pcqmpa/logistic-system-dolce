/**
 * Module with the users list container component.
 * @module src/client/containers/users-list
 */
// React - Redux.
import React, { Component, PropTypes } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { routerActions } from 'react-router-redux';

// Containers.
import { UsersFilterContainer } from './';

// Components.
import {
  Icon,
  Grid,
  GridCell,
  Button,
  BoxContainer,
  InputGroup,
  List,
  ListItem,
  ListSection
} from '../components/';

// Constants.
import {
  BRAND,
  MEDIUM_SIZE,
  XLARGE_SIZE
} from '../../shared/constants/types';
import {
  ACCOUNT_REMOVE,
  ACCOUNT_EDIT
} from '../constants/icons';
import {
  DARK,
  LIGHT,
  BUTTON_ICON
} from '../constants/themes';

// Styles.
import '../styles/layouts/_button-icon.scss';

class UsersList extends Component {
  static propTypes = {
    types: PropTypes.arrayOf(PropTypes.object),
    list: PropTypes.arrayOf(PropTypes.object),
    usersFilter: PropTypes.shape()
  };

  constructor(props) {
    super(props);

    this.state = {
      headers: [
        { text: 'Usuario', size: 30 },
        { text: 'Nombre', size: 30 },
        { text: 'Tipo', size: 20 },
        { text: 'Editar|Borrar', size: 20 }
      ]
    };
  }

  getUserTypeString = (typeId) => {
    const [typeString] = this.props.types.filter(type => (type.Id === typeId));
    return typeString.StrNombre;
  };

  filterUsers = (users) => {
    const { usersFilter } = this.props;
    return users
      .filter((user) => {
        if (usersFilter.fullname) {
          return user.StrNombre.includes(usersFilter.fullname);
        }
        return true;
      })
      .filter((user) => {
        if (usersFilter.type && usersFilter.type !== 'none') {
          return user.IdTipo === parseInt(usersFilter.type, 10);
        }
        return true;
      });
  }

  mapUsers = users => (
    this.filterUsers(users).map((user, key) => (
      <ListItem key={key}>
        <ListSection width={30}>{user.Strusuario}</ListSection>
        <ListSection width={30}>{user.StrNombre}</ListSection>
        <ListSection width={20}>{this.getUserTypeString(user.IdTipo)}</ListSection>
        <ListSection width={20}>
          <InputGroup center>
            <Button
              size={XLARGE_SIZE}
              layout={BUTTON_ICON}
            >
              <Icon
                type={ACCOUNT_EDIT}
                iconTheme={DARK}
              />
            </Button>
            <Button
              theme={BRAND}
              size={XLARGE_SIZE}
              layout={BUTTON_ICON}
            >
              <Icon
                type={ACCOUNT_REMOVE}
                iconTheme={LIGHT}
              />
            </Button>
          </InputGroup>
        </ListSection>
      </ListItem>
    ))
  );

  render() {
    const { list } = this.props;
    return (
      <BoxContainer
        pillar
        size={MEDIUM_SIZE}
      >
        <h2 className="c-heading">Usuarios</h2>
        <UsersFilterContainer />
        <Grid wrap noGutter>
          <GridCell width={80} className="u-letter-box--medium">
            <List>
              <ListItem header noGutter>
                {this.state.headers.map((header, key) => (
                  <ListSection key={key} width={header.size}>
                    {header.text}
                  </ListSection>
                ))}
              </ListItem>
              {this.mapUsers(list)}
            </List>
          </GridCell>
        </Grid>
      </BoxContainer>
    );
  }
}

export default connect(
  state => ({ ...state.users })
)(UsersList);
