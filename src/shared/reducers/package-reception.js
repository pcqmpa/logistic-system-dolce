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
  UPDATE_ORDERS_LIST,
  UPDATE_ORDERS_OBSERVATION,
  TOGGLE_SHOW_ORDERS_SUMMARY,
  PACKAGE_RECEPTION_REQUEST,
  PACKAGE_RECEPTION_SUCCESS,
  PACKAGE_RECEPTION_FAILED
} from '../constants/actions';

//
// Initial State.
// -----------------------------------------------------------------------------

/**
 * Initial state
 * @type {Object}
 */
const initialState = {
  ordersList: [],
  observation: '',
  isSubmitting: false,
  ordersSummary: [],
  showSummary: false
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
    ordersForm: state.ordersList
      .map((order) => {
        if (order.Id === orderId) {
          return {
            ...order,
            checked: !order.checked
          };
        }
        return { ...order };
      })
  }),
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
