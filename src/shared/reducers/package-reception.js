/**
 * Module with the package reception reducer.
 * @module src/shared/reducers/package-reception
 */
// Redux.
import { createReducer } from 'redux-create-reducer';

// Actions.
import {
  TOGGLE_ORDER,
  UPDATE_ORDERS_LIST,
  UPDATE_ORDERS_OBSERVATION,
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
    ordersList: orders
  }),
  [UPDATE_ORDERS_OBSERVATION]: (state, { observation }) => ({
    ...state,
    observation
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
