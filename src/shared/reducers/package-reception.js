/**
 * Module with the package reception reducer.
 * @module src/shared/reducers/package-reception
 */
// Redux.
import { createReducer } from 'redux-create-reducer';

// Lib.
import serializer from '../lib/serializer';

// Actions.
import {
  TOGGLE_ORDER,
  TOGGLE_ALL_ORDERS,
  UPDATE_ORDERS_LIST,
  UPDATE_ORDERS_OBSERVATION,
  TOGGLE_SHOW_ORDERS_SUMMARY,
  UPDATE_PACKAGE_RECEPTION_FILTER,
  PACKAGE_RECEPTION_REQUEST,
  PACKAGE_RECEPTION_SUCCESS,
  PACKAGE_RECEPTION_FAILED
} from '../constants/actions';

//
// Initial State.
// -----------------------------------------------------------------------------

/**
 * Filters initial state.
 * @type {Object}
 */
const filters = {
  zonesFilter: '',
  ordersFilter: ''
};

/**
 * Initial state
 * @type {Object}
 */
const initialState = {
  filters,
  ordersList: [],
  observation: '',
  ordersSummary: [],
  showSummary: false,
  toggleOrders: false,
  isSubmitting: false
};

//
// Handlers.
// -----------------------------------------------------------------------------

/**
 * Package reception action handlers.
 * @type {Object}
 */
const actionHandlers = {
  [TOGGLE_ORDER]: (state, { orderId }) => ({
    ...state,
    ordersList: state.ordersList
      .map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            checked: !order.checked
          };
        }
        return { ...order };
      })
  }),
  [TOGGLE_ALL_ORDERS]: (state) => {
    const toggleValue = !state.toggleOrders;
    return {
      ...state,
      ordersList: state.ordersList.map(order => ({
        ...order,
        checked: toggleValue
      })),
      toggleOrders: toggleValue
    };
  },
  [UPDATE_ORDERS_LIST]: (state, { orders }) => ({
    ...state,
    ordersList: orders,
    ordersSummary: serializer.toOrdersSummary(orders)
  }),
  [UPDATE_ORDERS_OBSERVATION]: (state, { observation }) => ({
    ...state,
    observation
  }),
  [TOGGLE_SHOW_ORDERS_SUMMARY]: state => ({
    ...state,
    showSummary: !state.showSummary
  }),
  [UPDATE_PACKAGE_RECEPTION_FILTER]: (state, { filter, value }) => ({
    ...state,
    filters: {
      ...state.filters,
      [filter]: value
    }
  }),
  [PACKAGE_RECEPTION_REQUEST]: state => ({
    ...state,
    isSubmitting: true
  }),
  [PACKAGE_RECEPTION_SUCCESS]: state => ({
    ...state,
    observation: '',
    ordersList: state.ordersList
      .map(order => ({
        ...order,
        checked: false
      })),
    isSubmitting: false
  }),
  [PACKAGE_RECEPTION_FAILED]: state => ({
    ...state,
    observation: '',
    ordersList: state.ordersList
      .map(order => ({
        ...order,
        checked: false
      })),
    isSubmitting: false
  })
};

export default createReducer(initialState, actionHandlers);
