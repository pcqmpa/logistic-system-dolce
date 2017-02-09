/**
 * Module with the package reception module actions.
 * @module src/shared/actions/package-reception-actions
 */
// Constants.
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

export const updateOrdersList = orders => ({ type: UPDATE_ORDERS_LIST, orders });

export const updateOrdersObservation = observation => ({
  type: UPDATE_ORDERS_OBSERVATION,
  observation
});

export const toggleAllOrders = () => ({ type: TOGGLE_ALL_ORDERS });

export const toggleOrder = orderId => ({ type: TOGGLE_ORDER, orderId });

export const toggleShowOrdersSummary = () => ({ type: TOGGLE_SHOW_ORDERS_SUMMARY });

export const updatePackageReceptionFilter = (filter, value) => ({
  type: UPDATE_PACKAGE_RECEPTION_FILTER,
  filter,
  value
});

export const packageReceptionRequest = () => ({ type: PACKAGE_RECEPTION_REQUEST });

export const packageReceptionSuccess = () => ({ type: PACKAGE_RECEPTION_SUCCESS });

export const packageReceptionFailed = () => ({ type: PACKAGE_RECEPTION_FAILED });
