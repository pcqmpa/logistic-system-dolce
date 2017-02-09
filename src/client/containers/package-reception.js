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
  CheckBox,
  TextArea
} from '../components/';
import { PackagesSummary } from './';

// Actions.
import {
  toggleOrder,
  toggleAllOrders,
  updateOrdersObservation,
  toggleShowOrdersSummary,
  updatePackageReceptionFilter,
  packageReceptionRequest
} from '../../shared/actions/package-reception-actions';
import {
  toggleDataTableElement,
  toggleDataTableElements,
  updateSelectedDataTable,
  updateSerializedDataTable
} from '../../shared/actions/data-table-actions';
import {
  updateRulesValidation
} from '../../shared/actions/form-rules-actions';

// Lib.
import validator from '../../shared/lib/validator';

// Constants.
import {
  BRAND,
  MEDIUM_SIZE,
  XLARGE_SIZE
} from '../../shared/constants/types';
import {
  PACKAGE_RECEPTION_FORM
} from '../../shared/constants/strings';
import {
  ZONES_FILTER,
  ORDERS_FILTER,
  PACKAGE_RECEPTION_FORM_RULES
} from '../constants/strings';

// Styles.
import '../styles/assign-transporter.scss';

class PackageReception extends Component {
  static propTypes = {
    filters: PropTypes.shape({
      zonesFilter: PropTypes.string,
      ordersFilter: PropTypes.string
    }),
    dataTable: PropTypes.shape({
      listData: PropTypes.array,
      selectedData: PropTypes.object,
      paginators: PropTypes.array
    }),
    formRules: PropTypes.shape({
      ordersList: PropTypes.object
    }),
    ordersList: PropTypes.arrayOf(PropTypes.object),
    observation: PropTypes.string,
    ordersSummary: PropTypes.shape(),
    showSummary: PropTypes.bool,
    toggleOrders: PropTypes.bool,
    toggleOrder: PropTypes.func,
    toggleAllOrders: PropTypes.func,
    updateOrdersObservation: PropTypes.func,
    toggleShowOrdersSummary: PropTypes.func,
    toggleDataTableElement: PropTypes.func,
    toggleDataTableElements: PropTypes.func,
    updateSelectedDataTable: PropTypes.func,
    updateSerializedDataTable: PropTypes.func,
    updatePackageReceptionFilter: PropTypes.func,
    packageReceptionRequest: PropTypes.func,
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
        { text: 'Recibido', size: 10 }
      ]
    };
  }

  /**
   * Maps the selected orders to be displayed.
   * @param {Array} orders -> The seleted orders.
   * @param {Bool} valid -> The forms validator.
   * @returns {Array} -> Array of Data Rows components.
   */
  mapOrders = (orders, valid) => (
    orders.list.map(order => (
      <DataRow key={`order_${order.id}`}>
        <DataItem center>
          {order.StrZona}
        </DataItem>
        <DataItem center>
          {order.StrTipoEmpaque}
        </DataItem>
        <DataItem center>
          {order.NumEmpaque}
        </DataItem>
        <DataItem center>
          {order.NumPedido}
        </DataItem>
        <DataItem center>
          {order.StrCodigoProducto}
        </DataItem>
        <DataItem center>
          {order.IntCantidad}
        </DataItem>
        <DataItem width={10}>
          <InputGroup center>
            <CheckBox
              name="check_order"
              valid={valid}
              checked={order.checked}
              onChange={this.handleToggleOrder(order.id, orders.id)}
            />
          </InputGroup>
        </DataItem>
      </DataRow>
    ))
  );

  /**
   * Handle data table paginator click.
   * @param {Number} chunkId -> The id of the chunk.
   * @param {DOMEvent} event -> The element event.
   * @returns {void}
   */
  handlePaginatorClick = chunkId => (event) => {
    event.preventDefault();
    this.props.updateSelectedDataTable(
      PACKAGE_RECEPTION_FORM,
      chunkId
    );
  };

  /**
   * Handles the show and hide of the summary modal.
   * @returns {void}
   */
  handleShowSummary = () => {
    this.props.toggleShowOrdersSummary();
  };

  /**
   * Updates the package reception observation field.
   * @param {DOMEvent} event -> The event object.
   * @returns {void}
   */
  handleObservationUpdates = (event) => {
    const { value } = event.target;
    this.props.updateOrdersObservation(value);
  };

  /**
   * Toggles a specific order.
   * @param {String} id -> The order id.
   * @param {Number} chunkId -> The selected chunk id.
   * @returns {void}
   */
  handleToggleOrder = (id, chunkId) => () => {
    this.props.toggleOrder(id);
    this.props.toggleDataTableElement(
      PACKAGE_RECEPTION_FORM,
      chunkId,
      id
    );
  };

  /**
   * Handle the check of toggle all orders.
   * @returns {void}
   */
  handleToggleOrders = () => {
    this.props.toggleAllOrders();
    this.props.toggleDataTableElements(
      PACKAGE_RECEPTION_FORM,
      !this.props.toggleOrders
    );
  };

  /**
   * Handle the filters updates.
   * @param {String} type -> The type of filter.
   * @param {DOMEvent} event -> The input event.
   * @returns {void}
   */
  handleFiltersUpdates = type => (event) => {
    const { ordersList, filters } = this.props;
    const { value } = event.target;
    const filteredOrders = this.filterOrders(
      { ...filters, [type]: value },
      ordersList
    );
    this.props.updatePackageReceptionFilter(type, value);
    this.props.updateSerializedDataTable(
      PACKAGE_RECEPTION_FORM,
      filteredOrders
    );
  };

  /**
   * Handles the submit of the checked orders.
   * @return {void}
   */
  handleSubmitForm = () => {
    const { ordersList, formRules } = this.props;
    const formValidation = validator.run(formRules, { ordersList });

    this.props.updateRulesValidation(
      PACKAGE_RECEPTION_FORM_RULES,
      formValidation.resume
    );

    if (formValidation.valid) {
      this.props.packageReceptionRequest();
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
      formRules,
      dataTable,
      observation,
      showSummary,
      ordersSummary,
      toggleOrders
    } = this.props;

    return (
      <BoxContainer
        window
        size={MEDIUM_SIZE}
      >
        <h2 className="c-heading">Recepción de Paquetes</h2>
        <Grid noGutter>
          <GridCell width={20}>
            <InputBox
              id={ZONES_FILTER}
              placeholder="Filtrar zonas"
              onChange={this.handleFiltersUpdates(ZONES_FILTER)}
            />
          </GridCell>
          <GridCell width={20} offset={5}>
            <InputBox
              id={ORDERS_FILTER}
              placeholder="Filtrar pedidos"
              onChange={this.handleFiltersUpdates(ORDERS_FILTER)}
            />
          </GridCell>
          <GridCell width={20} offset={35}>
            <CheckBox
              id="check_all_orders"
              label
              checked={toggleOrders}
              onChange={this.handleToggleOrders}
            >
              Seleccionar Todos
            </CheckBox>
          </GridCell>
        </Grid>
        <Grid
          wrap
          noGutter
          className="u-letter-box--medium"
        >
          <GridCell width={100}>
            <DataTable
              paginators={dataTable.paginators}
              selected={dataTable.selectedData.id}
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
                { (dataTable.selectedData.list) ?
                  this.mapOrders(
                    dataTable.selectedData,
                    formRules.ordersList.valid
                  ) : ''
                }
              </DataContent>
            </DataTable>
          </GridCell>
        </Grid>
        <Grid noGutter>
          <GridCell width={50}>
            <TextArea
              rows={6}
              value={observation}
              placeholder="Deje sus comentarios"
              onChange={this.handleObservationUpdates}
            />
          </GridCell>
          <GridCell width={20} offset={5}>
            <Button
              size={XLARGE_SIZE}
              onClick={this.handleSubmitForm}
            >
              Recibir Pedidos
            </Button>
          </GridCell>
          <GridCell width={10}>
            <Button
              theme={BRAND}
              onClick={this.handleShowSummary}
            >
              Resumen
            </Button>
          </GridCell>
        </Grid>
        <PackagesSummary
          showSummary={showSummary}
          ordersSummary={ordersSummary}
          handleCloseSummary={this.handleShowSummary}
        />
      </BoxContainer>
    );
  }
}

export default connect(
  state => ({
    ...state.packageReception,
    dataTable: state.dataTable.packageReceptionFormTable,
    formRules: state.formRules.packageReceptionForm
  }),
  dispatch => (bindActionCreators({
    toggleOrder,
    toggleAllOrders,
    updateOrdersObservation,
    toggleShowOrdersSummary,
    toggleDataTableElement,
    toggleDataTableElements,
    updateSelectedDataTable,
    updateSerializedDataTable,
    updatePackageReceptionFilter,
    packageReceptionRequest,
    updateRulesValidation
  }, dispatch))
)(PackageReception);
