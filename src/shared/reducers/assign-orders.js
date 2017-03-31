/**
 * Module with the assign orders reducer.
 * @module src/shared/reducers/assign-orders
 */
// Redux.
import { createReducer } from 'redux-create-reducer';

// Actions.
import {
  TOGGLE_ORDER_TO_ASSIGN,
  UPDATE_ORDERS_TO_ASSIGN_LIST,
  UPDATE_ORDERS_TO_ASSIGN_FILTER,

  ASSIGN_ORDERS_TO_DISTRIBUTOR_REQUEST,
  ASSIGN_ORDERS_TO_DISTRIBUTOR_SUCCESS,
  ASSIGN_ORDERS_TO_DISTRIBUTOR_FAILED
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
  distributorUser: '',
  ordersToAssignList: [],
  isSubmitting: false,
  failed: false
};

//
// Handlers.
// -----------------------------------------------------------------------------

/**
 * Package reception action handlers.
 * @type {Object}
 */
const actionHandlers = {
  [TOGGLE_ORDER_TO_ASSIGN]: (state, { orderId }) => ({
    ...state,
    ordersToAssignList: state.ordersToAssignList
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
  [UPDATE_ORDERS_TO_ASSIGN_LIST]: (state, { orders }) => ({
    ...state,
    ordersList: orders
  }),
  [UPDATE_ORDERS_TO_ASSIGN_FILTER]: (state, { filter, value }) => ({
    ...state,
    filters: {
      ...state.filters,
      [filter]: value
    }
  }),
  [ASSIGN_ORDERS_TO_DISTRIBUTOR_REQUEST]: state => ({
    ...state,
    isSubmitting: true
  }),
  [ASSIGN_ORDERS_TO_DISTRIBUTOR_SUCCESS]: state => ({
    ...state,
    ordersList: state.ordersList
      .map(order => ({
        ...order,
        checked: false
      })),
    isSubmitting: false
  }),
  [ASSIGN_ORDERS_TO_DISTRIBUTOR_FAILED]: state => ({
    ...state,
    observation: '',
    ordersList: state.ordersList
      .map(order => ({
        ...order,
        checked: false
      })),
    isSubmitting: false,
    failed: true
  })
};

export default createReducer(initialState, actionHandlers);
