/* eslint-disable */
/**
 * Module with the users list container component.
 * @module src/client/containers/users-list
 */
// React.
import React, { Component, PropTypes } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { routerActions } from 'react-router-redux';

// Components.
import {
  Icon,
  Grid,
  GridCell,
  Button,
  BoxContainer,
  InputBox,
  SelectBox,
  InputGroup,
  InputGroupItem,
  Table,
  TableHead,
  TableRow,
  TableCell
} from '../components/';

// Constants.
import { MEDIUM_SIZE, XLARGE_SIZE } from '../../shared/constants/types';
import { ACCUNT_PLUS, BACKSPACE } from '../constants/icons';
import { DARK, BUTTON_ICON } from '../constants/themes';

// Styles.
import '../styles/layouts/_button-icon.scss';

class UsersList extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.object),
    editUSer: PropTypes.shape(),
    usersFilter: PropTypes.shape()
  };

  constructor(props) {
    super(props);

    this.state = {
      headers: [
        { text: 'Usuario', size: 30 },
        { text: 'Nombre', size: 30 },
        { text: 'Tipo', size: 30 },
        { text: 'Editar|Borrar', size: 10 }
      ]
    };
  }

  render() {
    return (
      <BoxContainer
        pillar
        size={MEDIUM_SIZE}
      >
        <h2 className="c-heading">Usuarios</h2>
        <Grid wrap noGutter>
          <GridCell width={10}>
            <Button
              size={XLARGE_SIZE}
              layout={BUTTON_ICON}
            >
              <Icon
                type={ACCUNT_PLUS}
                iconTheme={DARK}
              />
            </Button>
          </GridCell>
          <GridCell width={40}>
            <InputGroup>
              <InputGroupItem>
                <InputBox
                  id="username_filter"
                  name="username_filter"
                  placeholder="Filtro de usuarios"
                />  
              </InputGroupItem>
              <InputGroupItem>
                <SelectBox
                  id="user_type_filter"
                  name="user_type_filter"
                  placeholder="Tipo de usuario"
                  options={[{ value: 1, text: 'asd' }]}
                />
              </InputGroupItem>
              <Button
                size={XLARGE_SIZE}
                layout={BUTTON_ICON}
              >
                <Icon
                  type={BACKSPACE}
                  iconTheme={DARK}
                />
              </Button>
            </InputGroup>
          </GridCell>
          <GridCell width={80} className="u-letter-box--medium">
            <Grid noGutter>
              {this.state.headers.map((header, key) => (
                <GridCell key={key} width={header.size}>
                  {header.text}
                </GridCell>  
              ))}
            </Grid>
          </GridCell>
        </Grid>
      </BoxContainer>
    );
  }
}

export default connect(
  state => ({ ...state.users })
)(UsersList);
