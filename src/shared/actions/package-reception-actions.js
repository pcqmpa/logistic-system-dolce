/**
 * Module with the package reception module actions.
 * @module src/shared/actions/package-reception-actions
 */
// Constants.
import {
  TOGGLE_ORDER,
  TOGGLE_ALL_ORDERS,
  UPDATE_ORDER_LIST,
  UPDATE_ORDERS_FORM,
  UPDATE_ORDERS_OBSERVATION,
  PACKAGE_RECEPTION_REQUEST,
  PACKAGE_RECEPTION_SUCCESS,
  PACKAGE_RECEPTION_FAILED
} from '../constants/actions';

export const updateOrderList = orders => ({ type: UPDATE_ORDER_LIST, orders });

export const updateOrdersForm = orders => ({ type: UPDATE_ORDERS_FORM, orders });

export const updateOrdersObservation = observation => ({
  type: UPDATE_ORDERS_OBSERVATION,
  observation
});

export const toggleAllOrders = () => ({ type: TOGGLE_ALL_ORDERS });

export const toggleOrder = (zoneId, order) => ({
  type: TOGGLE_ORDER,
  zoneId,
  order
});

export const packageReceptionRequest = () => ({ type: PACKAGE_RECEPTION_REQUEST });

export const packageReceptionSuccess = () => ({ type: PACKAGE_RECEPTION_SUCCESS });

export const packageReceptionFailed = () => ({ type: PACKAGE_RECEPTION_FAILED });
