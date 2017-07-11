/**
 * Module with the assign transporter container component.
 * @module src/client/containers/assign-transporter
 */
// React - Redux.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components.
import {
  Grid,
  GridCell,
  DataTable,
  DataHeader,
  DataContent,
  DataRow,
  DataItem,
  BoxContainer,
  InputGroup,

  Button,
  InputBox,
  SelectBox,
  RadioButton
} from '../components/';

// Lib.
import validator from '../../shared/lib/validator';

// Actions.
import {
  updateSerializedDataTable,
  updateSelectedDataTable
} from '../../shared/actions/data-table-actions';
import {
  updateTransporterFormUser,
  updateTransporterFormMaster,
  assignTransporterRequest,
  updateTransportersFilter
} from '../../shared/actions/transporters-actions';
import { updateRulesValidation } from '../../shared/actions/form-rules-actions';

// Constants.
import {
  MEDIUM_SIZE,
  XLARGE_SIZE
} from '../../shared/constants/types';
import { TRANSPORTER } from '../../shared/constants/user-types';
import {
  SELECT_TRANSPORTER_INPUT
} from '../constants/strings';
import {
  TRANSPORTER_FORM,
  TRANSPORTERS_FILTER,
  TRANSPORTER_FORM_RULES
} from '../../shared/constants/strings';

// Styles.
import '../styles/assign-transporter.scss';

class AssignTransporter extends Component {
  static propTypes = {
    actions: PropTypes.shape().isRequired,
    transporters: PropTypes.arrayOf(PropTypes.object),
    form: PropTypes.shape(),
    users: PropTypes.arrayOf(PropTypes.object),
    filter: PropTypes.string,
    dataTable: PropTypes.shape(),
    formRules: PropTypes.shape()
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

  /**
   * Maps the transporter users to the select box.
   * @param {Array} users -> The list of all users.
   * @returns {Array} -> The mapped users.
   */
  mapTransporterUsers = users => (
    users
      .filter(user => (user.IdTipo === TRANSPORTER))
      .map(user => ({
        value: user.Idusuario,
        text: user.StrNombre
      }))
  );

  /**
   * Map the transporter masters.
   * @param {Array} masters -> The current list of masters.
   * @returns {Array} -> List of ReactElements.
   */
  mapMasters = masters => (
    masters.map((master, key) => (
      <DataRow key={btoa(`transporter_${key}`)}>
        <DataItem width={40}>{master.StrNombre}</DataItem>
        <DataItem center width={40}>{master.StrDocumento}</DataItem>
        <DataItem width={20}>
          <InputGroup center>
            <RadioButton
              name="select_transporter_master"
              value={master.Id.toString()}
              valid={this.props.formRules.idTransporter.valid}
              onChange={this.handleSelectMaster(master.Id)}
              checked={master.Id === this.props.form.idTransporter}
            />
          </InputGroup>
        </DataItem>
      </DataRow>
    ))
  );

  /**
   * Handle data table paginator click.
   * @param {Number} idData -> The id of the chunk.
   * @param {DOMEvent} event -> The element event.
   * @returns {void}
   */
  handlePaginatorClick = idData => (event) => {
    event.preventDefault();
    this.props.actions.updateSelectedDataTable(
      TRANSPORTER_FORM,
      idData
    );
  };

  /**
   * Handle select transporter user.
   * @param {DOMEvent} event -> The element event.
   * @returns {void}
   */
  handleSelectUser = (event) => {
    event.preventDefault();
    const idUser = parseInt(event.target.value, 10);
    const [selectedUser] = this.props.users
      .filter(user => (user.Idusuario === idUser));
    this.props.actions.updateTransporterFormUser(
      (isNaN(idUser)) ? '' : idUser.toString(),
      (isNaN(idUser)) ? '' : selectedUser.StrNombre
    );
  };

  /**
   * Handle select transporter master.
   * @param {String} idTransporter -> The transporter master id.
   * @param {DOMEvent} event -> The element event.
   * @returns {void}
   */
  handleSelectMaster = idTransporter => () => {
    this.props.actions.updateTransporterFormMaster(idTransporter);
  };

  /**
   * Handle submit of the transporter assign.
   * @param {DOMEvent} event -> The element event.
   * @returns {void}
   */
  handleSubmitForm = () => {
    const { form, formRules } = this.props;
    const formValidation = validator.run(formRules, form);

    this.props.actions.updateRulesValidation(
      TRANSPORTER_FORM_RULES,
      formValidation.resume
    );

    if (formValidation.valid) {
      this.props.actions.assignTransporterRequest();
    }
  };

  /**
   * Handle changes on the filter.
   * @param {DOMEvent} event -> The element event.
   * @returns {void}
   */
  handleFilterChanges = (event) => {
    const { value } = event.target;
    const filteredUsers = this.props.transporters
      .filter(user => (user.StrNombre.toUpperCase().includes(value.toUpperCase())));

    this.props.actions.updateTransportersFilter(
      TRANSPORTERS_FILTER,
      value
    );

    this.props.actions.updateSerializedDataTable(
      TRANSPORTER_FORM,
      filteredUsers
    );
  };

  render() {
    const {
      form,
      users,
      filter,
      formRules,
      dataTable
    } = this.props;
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
              value={form.idUser}
              valid={formRules.idUser.valid}
              options={this.mapTransporterUsers(users)}
              onChange={this.handleSelectUser}
            />
          </GridCell>
          <GridCell width={20} offset={5}>
            <p className="user-name-box">{form.nameUser}</p>
          </GridCell>
          <GridCell width={20} offset={15}>
            <InputBox
              value={filter}
              placeholder="Filtrar transportadores"
              onChange={this.handleFilterChanges}
            />
          </GridCell>
        </Grid>
        <Grid
          wrap
          noGutter
          className="u-letter-box--medium"
        >
          <GridCell width={80}>
            <DataTable
              selected={dataTable.selectedData.id}
              paginators={dataTable.paginators}
              onClickPaginator={this.handlePaginatorClick}
            >
              <DataHeader>
                {this.state.headers.map((title, key) => (
                  <DataItem key={btoa(`title_${key}`)} width={title.size}>
                    {title.text}
                  </DataItem>
                ))}
              </DataHeader>
              <DataContent>
                {(dataTable.selectedData.list) ?
                  this.mapMasters(dataTable.selectedData.list) : ''}
              </DataContent>
            </DataTable>
            <p>
              <Button
                size={XLARGE_SIZE}
                onClick={this.handleSubmitForm}
              >
                Asignar
              </Button>
            </p>
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
    filter: state.transporters.filters.transportersFilter,
    users: state.users.list,
    dataTable: state.dataTable.transporterFormTable,
    formRules: state.formRules.transporterForm
  }),
  dispatch => ({
    actions: bindActionCreators({
      updateSelectedDataTable,
      updateTransporterFormUser,
      updateTransporterFormMaster,
      assignTransporterRequest,
      updateRulesValidation,
      updateTransportersFilter,
      updateSerializedDataTable
    }, dispatch)
  })
)(AssignTransporter);
