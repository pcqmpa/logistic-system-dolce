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
  updateOrdersObservation,
  toggleShowOrdersSummary
} from '../../shared/actions/package-reception-actions';
import {
  toggleDataTableElement,
  updateSelectedDataTable
} from '../../shared/actions/data-table-actions';

// Constants.
import {
  BRAND,
  MEDIUM_SIZE,
  XLARGE_SIZE
} from '../../shared/constants/types';
import {
  PACKAGE_RECEPTION_FORM
} from '../../shared/constants/strings';
// import {
//   PACKAGE_RECEPTION_ZONES_FILTER,
//   PACKAGE_RECEPTION_ORDERS_FILTER
// } from '../constants/strings';

// Styles.
import '../styles/assign-transporter.scss';

class PackageReception extends Component {
  static propTypes = {
    dataTable: PropTypes.shape({
      listData: PropTypes.array,
      selectedData: PropTypes.object,
      paginators: PropTypes.array
    }),
    observation: PropTypes.string,
    ordersSummary: PropTypes.shape(),
    showSummary: PropTypes.bool,
    updateOrdersObservation: PropTypes.func,
    toggleShowOrdersSummary: PropTypes.func,
    toggleDataTableElement: PropTypes.func,
    updateSelectedDataTable: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      headers: [
        { text: 'Zona' },
        { text: 'Tipo de Empaque' },
        { text: 'Número de Empaque' },
        { text: 'Código de Producto' },
        { text: 'Cantidad' },
        { text: 'Recibido' }
      ]
    };
  }

  /**
   * Maps the selected orders to be displayed.
   * @param {Array} orders -> The seleted orders.
   * @returns {Array} -> Array of Data Rows components.
   */
  mapOrders = orders => (
    orders.list.map(order => (
      <DataRow key={`order_${order.Id}`}>
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
          {order.StrCodigoProducto}
        </DataItem>
        <DataItem center>
          {order.IntCantidad}
        </DataItem>
        <DataItem>
          <InputGroup center>
            <CheckBox
              name="check_order"
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
   * @param {Number} cunkId -> The id of the chunk.
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
    this.props.toggleDataTableElement(
      PACKAGE_RECEPTION_FORM,
      chunkId,
      id
    );
  };

  render() {
    const {
      dataTable,
      observation,
      showSummary,
      ordersSummary
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
              placeholder="Filtrar zonas"
            />
          </GridCell>
          <GridCell width={20} offset={5}>
            <InputBox
              placeholder="Filtrar pedidos"
            />
          </GridCell>
          <GridCell width={10} offset={45}>
            <CheckBox
              id="check_all_orders"
              label="Seleccionar Todos"
            />
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
                {this.mapOrders(dataTable.selectedData)}
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
    dataTable: state.dataTable.packageReceptionFormTable
  }),
  dispatch => (bindActionCreators({
    updateOrdersObservation,
    toggleShowOrdersSummary,
    toggleDataTableElement,
    updateSelectedDataTable
  }, dispatch))
)(PackageReception);
