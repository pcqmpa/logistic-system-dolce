/**
 * Module with the assign transporter container component.
 * @module src/client/containers/assign-transporter
 */
// React - Redux.
import React, { PropTypes, Component } from 'react';
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
  CheckBox
} from '../components/';

// Lib.
import validator from '../../shared/lib/validator';

// Utils.
import { string } from '../../shared/utils/';

// Actions.
import {
  updateSerializedDataTable,
  updateSelectedDataTable
} from '../../shared/actions/data-table-actions';
import {
  updateDistributorFormTransporter,
  updateDistributorFormDistributors,
  assignDistributorRequest,
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
  DISTRIBUTOR_FORM_RULES,
  SELECT_TRANSPORTER_INPUT
} from '../constants/strings';
import {
  DISTRIBUTOR_FORM,
  DISTRIBUTORS_FILTER
} from '../../shared/constants/strings';

// Styles.
import '../styles/assign-transporter.scss';

class AssignDistributors extends Component {
  static propTypes = {
    actions: PropTypes.shape().isRequired,
    form: PropTypes.shape(),
    users: PropTypes.arrayOf(PropTypes.object),
    dataTable: PropTypes.shape(),
    formRules: PropTypes.shape()
  };

  constructor(props) {
    super(props);

    this.state = {
      headers: [
        { text: 'Usuario', size: 40 },
        { text: 'Nombre', size: 40 },
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
   * Map the distributor users.
   * @param {Array} distributors -> The current list of distributors.
   * @returns {Array} -> List of ReactElements.
   */
  mapDistributors = distributors => (
    distributors.map((distributor, key) => (
      <DataRow key={key}>
        <DataItem center width={40}>{distributor.Strusuario}</DataItem>
        <DataItem center width={40}>{distributor.StrNombre}</DataItem>
        <DataItem width={20}>
          <InputGroup center>
            <CheckBox
              name="select_distributors"
              value={distributor.Idusuario.toString()}
              valid={this.props.formRules.distributors.valid}
              onChange={this.handleSelectDistributor(distributor.Idusuario)}
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
      DISTRIBUTOR_FORM,
      idData
    );
  };

  /**
   * Handle select transporter user.
   * @param {DOMEvent} event -> The element event.
   * @returns {void}
   */
  handleSelectTransporter = (event) => {
    event.preventDefault();
    const idTransporter = parseInt(event.target.value, 10);
    const [selectedUser] = this.props.users
      .filter(user => (user.Idusuario === idTransporter));
    this.props.actions.updateDistributorFormTransporter(
      (isNaN(idTransporter)) ? '' : idTransporter.toString(),
      (isNaN(idTransporter)) ? '' : selectedUser.StrNombre
    );
  };

  /**
   * Handle select distributor user.
   * @param {String} idDistributor -> The distributor id.
   * @param {DOMEvent} event -> The element event.
   * @returns {void}
   */
  handleSelectDistributor = idDistributor => () => {
    this.props.actions.updateDistributorFormDistributors(idDistributor);
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
      DISTRIBUTOR_FORM_RULES,
      formValidation.resume
    );

    if (formValidation.valid) {
      this.props.actions.assignDistributorRequest();
    }
  };

  /**
   * Handle changes on the filter.
   * @param {DOMEvent} event -> The element event.
   * @returns {void}
   */
  handleFilterChanges = (event) => {
    const { value } = event.target;

    this.props.actions.updateTransportersFilter(
      DISTRIBUTORS_FILTER,
      value
    );

    if (!string.empty(value)) {
      const filteredUsers = this.props.users.list
      .filter(user => (user.StrNombre.toUpperCase().includes(value.toUpperCase())));
      this.props.actions.updateSerializedDataTable(
        DISTRIBUTOR_FORM,
        filteredUsers
      );
    }
  };

  render() {
    const {
      form,
      users,
      formRules,
      dataTable
    } = this.props;
    return (
      <BoxContainer
        pillar
        size={MEDIUM_SIZE}
      >
        <h2 className="c-heading">Asignar Ditribuidores</h2>
        <Grid noGutter>
          <GridCell width={20}>
            <SelectBox
              id="user_transporter"
              name="user_transporter"
              placeholder={SELECT_TRANSPORTER_INPUT}
              value={form.idTransporter}
              valid={formRules.idTransporter.valid}
              options={this.mapTransporterUsers(users)}
              onChange={this.handleSelectTransporter}
            />
          </GridCell>
          <GridCell width={20} offset={5}>
            <p className="user-name-box">{form.nameTransporter}</p>
          </GridCell>
          <GridCell width={20} offset={15}>
            <InputBox
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
                  <DataItem key={key} width={title.size}>
                    {title.text}
                  </DataItem>
                ))}
              </DataHeader>
              <DataContent>
                {this.mapDistributors(dataTable.selectedData.list)}
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
    form: state.transporters.distributorForm,
    users: state.users.list,
    dataTable: state.dataTable.distributorFormTable,
    formRules: state.formRules.distributorForm
  }),
  dispatch => ({
    actions: bindActionCreators({
      updateSelectedDataTable,
      updateDistributorFormTransporter,
      updateDistributorFormDistributors,
      assignDistributorRequest,
      updateRulesValidation,
      updateTransportersFilter,
      updateSerializedDataTable
    }, dispatch)
  })
)(AssignDistributors);
