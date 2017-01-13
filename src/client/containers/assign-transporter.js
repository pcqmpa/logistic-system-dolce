/**
 * Module with the assign transporter container component.
 * @module src/client/containers/assign-transporter
 */
// React - Redux.
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Components.
import {
  Grid,
  GridCell,
  List,
  ListItem,
  ListSection,
  BoxContainer,
  InputGroup,

  SelectBox,
  InputBox
} from '../components/';

// Constants.
import {
  CHECKBOX,
  MEDIUM_SIZE
} from '../../shared/constants/types';
import { TRANSPORTER } from '../../shared/constants/user-types';
import {
  SELECT_MASTER,
  SELECT_TRANSPORTER_INPUT
} from '../constants/strings';

class AssignTransporter extends Component {
  static propTypes = {
    form: PropTypes.shape(),
    users: PropTypes.arrayOf(PropTypes.object)
  };

  constructor(props) {
    super(props);

    this.state = {
      headers: [
        { text: 'Nombre', size: 40 },
        { text: 'Documento', size: 40 },
        { text: 'Seleccionar', size: 20 }
      ]
    };
  }

  mapTransporterUsers = users => (
    users
      .filter(user => (user.IdTipo === TRANSPORTER))
      .map(user => ({
        value: user.IdUsario,
        text: user.StrNombre
      }))
  );

  mapMasters = masters => (
    masters.map((master, key) => (
      <ListItem key={key}>
        <ListSection width={40}>{master.StrNombre}</ListSection>
        <ListSection width={40}>{master.StrDocumento}</ListSection>
        <ListSection width={20}>
          <InputGroup center>
            <InputBox
              type={CHECKBOX}
              id={`${SELECT_MASTER}_input_${key}`}
              valid
            />
          </InputGroup>
        </ListSection>
      </ListItem>
    ))
  );

  render() {
    const { form, users } = this.props;
    return (
      <BoxContainer
        pillar
        size={MEDIUM_SIZE}
      >
        <h2 className="c-heading">Asignar Transportador</h2>
        <Grid noGutter>
          <GridCell width={20}>
            <SelectBox
              id="user_transporter"
              name="user_transporter"
              placeholder={SELECT_TRANSPORTER_INPUT}
              valid
              value={form.idUser}
              options={this.mapTransporterUsers(users)}
            />
          </GridCell>
          <GridCell width={20} offset={40}>
            <p>{form.nameUser}</p>
          </GridCell>
        </Grid>
        <Grid noGutter>
          <GridCell width={80}>
            <List>
              <ListItem header noGutter>
                {this.state.headers.map((header, key) => (
                  <ListSection key={key} width={header.size}>
                    {header.text}
                  </ListSection>
                ))}
              </ListItem>
            </List>
          </GridCell>
        </Grid>
      </BoxContainer>
    );
  }
}

export default connect(
  state => ({
    form: state.transporters.transporterForm,
    transporters: state.transporters.list,
    users: state.users.list
  })
)(AssignTransporter);
