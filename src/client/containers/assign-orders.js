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
  Table,
  TableHead,
  TableRow,
  TableCell,
  BoxContainer,

  Button,
  InputBox,
  CheckBox,
  SelectBox
} from '../components/';

// Actions.
import {
  toggleOrderToAssign,
  updateOrdersToAssignFilter,
  updateDistributorUserToAssign,
  assignOrdersToDistributorRequest
} from '../../shared/actions/assign-orders-actions';
import {
  updateRulesValidation
} from '../../shared/actions/form-rules-actions';

// Lib.
import validator from '../../shared/lib/validator';

// Constants.
import {
  DISTRIBUTOR_TO_ASSIGN_INPUT,
  ORDERS_ZONE_FILTER_INPUT,
  ORDERS_NUM_FILTER_INPUT,

  DISTRIBUTOR_TO_ASSIGN_INPUT_ID,
  ORDERS_ZONE_FILTER_INPUT_ID,
  ORDERS_NUM_FILTER_INPUT_ID,
  ORDERS_TO_ASSIGN_INPUT_ID
} from '../constants/strings';
import {
  MEDIUM_SIZE,
  XLARGE_SIZE
} from '../../shared/constants/types';
import {
  ORDERS_NUM_FILTER,
  ORDERS_ZONE_FILTER,
  ASSIGN_ORDERS_FORM_RULES
} from '../../shared/constants/strings';

class PackageReception extends Component {
  static propTypes = {
    filters: PropTypes.shape({
      zonesFilter: PropTypes.string,
      ordersFilter: PropTypes.string
    }),
    distributorUser: PropTypes.string,
    ordersToAssignList: PropTypes.arrayOf(PropTypes.object),
    toggleOrderToAssign: PropTypes.func,
    updateOrdersToAssignFilter: PropTypes.func,
    updateDistributorUserToAssign: PropTypes.func,
    assignOrdersToDistributorRequest: PropTypes.func,
    formRules: PropTypes.shape({
      distributorUser: PropTypes.object,
      ordersToAssignList: PropTypes.object
    }),
    updateRulesValidation: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      headers: [
        { text: 'Zona' },
        { text: 'Tipo de Empaque' },
        { text: 'Número de Empaque' },
        { text: 'Número de Pedido' },
        { text: 'Código de Producto' },
        { text: 'Cantidad' },
        { text: 'Asignar' }
      ]
    };
  }

  /**
   * Maps the orders to be displayed.
   * @param {Array} orders -> The orders.
   * @param {Bool} valid -> The forms validator.
   * @returns {Array} -> Array of Data Rows components.
   */
  mapOrders = (orders, valid) => (
    orders.map(order => (
      <TableRow key={`order_${order.id}`}>
        <TableCell center>
          {order.StrZona}
        </TableCell>
        <TableCell center>
          {order.StrTipoEmpaque}
        </TableCell>
        <TableCell center>
          {order.NumEmpaque}
        </TableCell>
        <TableCell center>
          {order.NumPedido}
        </TableCell>
        <TableCell center>
          {order.StrCodigoProducto}
        </TableCell>
        <TableCell center>
          {order.IntCantidad}
        </TableCell>
        <TableCell center>
          <CheckBox
            name={ORDERS_TO_ASSIGN_INPUT_ID}
            valid={valid}
            checked={order.checked}
            onChange={this.handleToggleOrder(order.id)}
          />
        </TableCell>
      </TableRow>
    ))
  );

  /**
   * Toggles a specific order.
   * @param {String} id -> The order id.
   * @returns {void}
   */
  handleToggleOrder = id => () => {
    this.props.toggleOrderToAssign(id);
  };

  /**
   * Handle the filters updates.
   * @param {String} type -> The type of filter.
   * @param {DOMEvent} event -> The input event.
   * @returns {void}
   */
  handleFiltersUpdates = type => (event) => {
    const { value } = event.target;
    this.props.updateOrdersToAssignFilter(type, value);
  };

  /**
   * Handle the selection of the distributor to assign orders.
   * @param {DOMEvent} event -> The input event.
   * @returns {void}
   */
  handleDistributorSelection = (event) => {
    event.preventDefault();
    const { value } = event.target;
    this.props.updateDistributorUserToAssign(value);
  };

  /**
   * Handles the submit of the checked orders.
   * @return {void}
   */
  handleSubmitForm = () => {
    const {
      formRules,
      distributorUser,
      ordersToAssignList
    } = this.props;

    const formValidation = validator.run(formRules, {
      distributorUser,
      ordersToAssignList
    });

    this.props.updateRulesValidation(
      ASSIGN_ORDERS_FORM_RULES,
      formValidation.resume
    );

    if (formValidation.valid) {
      this.props.assignOrdersToDistributorRequest();
    }
  }

  /**
   * Filters the orders based on the current filter values.
   * @param {Object} filters -> The filters.
   * @param {Array} orders -> The orders.
   * @returns {Array} -> The filtered orders.
   */
  filterOrders = (filters, orders) => (
    orders
      .filter(order => (
        order.StrZona.toUpperCase()
          .includes(filters.zonesFilter.toUpperCase())
      ))
      .filter(order => (
        order.NumPedido.toString().toUpperCase()
          .includes(filters.ordersFilter.toUpperCase())
      ))
  );

  render() {
    const {
      filters,
      formRules,
      distributorUser,
      ordersToAssignList
    } = this.props;
    const filteredOrders = this.filterOrders(ordersToAssignList, filters);

    return (
      <BoxContainer
        window
        size={MEDIUM_SIZE}
      >
        <h2 className="c-heading">Asignación de Paquetes</h2>
        <Grid noGutter>
          <GridCell width={20}>
            <SelectBox
              id={DISTRIBUTOR_TO_ASSIGN_INPUT_ID}
              name={DISTRIBUTOR_TO_ASSIGN_INPUT_ID}
              value={distributorUser}
              valid={formRules.distributorUser.valid}
              placeholder={DISTRIBUTOR_TO_ASSIGN_INPUT}
              options={[{ value: 'test', text: 'test' }]}
              onChange={this.handleDistributorSelection}
            />
          </GridCell>
          <GridCell width={20}>
            <InputBox
              id={ORDERS_ZONE_FILTER_INPUT_ID}
              placeholder={ORDERS_ZONE_FILTER_INPUT}
              onChange={this.handleFiltersUpdates(ORDERS_ZONE_FILTER)}
            />
          </GridCell>
          <GridCell width={20} offset={5}>
            <InputBox
              id={ORDERS_NUM_FILTER_INPUT_ID}
              placeholder={ORDERS_NUM_FILTER_INPUT}
              onChange={this.handleFiltersUpdates(ORDERS_NUM_FILTER)}
            />
          </GridCell>
        </Grid>
        <Grid
          wrap
          noGutter
          className="u-letter-box--medium"
        >
          <GridCell width={100}>
            <Table>
              <TableHead
                center
                titles={this.state.headers}
              />
              {filteredOrders.length > 0 ?
                this.mapOrders(filteredOrders, formRules.valid) : (
                  <TableRow>
                    <TableCell center>
                      No hay paquetes en el momento.
                    </TableCell>
                  </TableRow>
                )}
            </Table>
          </GridCell>
        </Grid>
        <Grid noGutter>
          <GridCell width={20} offset={5}>
            <Button
              size={XLARGE_SIZE}
              onClick={this.handleSubmitForm}
            >
              Asignar Paquetes
            </Button>
          </GridCell>
        </Grid>
      </BoxContainer>
    );
  }
}

export default connect(
  state => ({
    ...state.assignOrders,
    dataTable: state.dataTable.assignOrdersFormTable,
    formRules: state.formRules.assignOrdersForm
  }),
  dispatch => (bindActionCreators({
    toggleOrderToAssign,
    updateOrdersToAssignFilter,
    updateDistributorUserToAssign,
    assignOrdersToDistributorRequest,
    updateRulesValidation
  }, dispatch))
)(PackageReception);
