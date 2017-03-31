/**
 * Module with the assign orders to distributor actions.
 * @module src/shared/actions/assign-orders-actions
 */
// Constants.
import {
  TOGGLE_ORDER_TO_ASSIGN,
  UPDATE_ORDERS_TO_ASSIGN_LIST,
  UPDATE_DISTRIBUTOR_USER_TO_ASSIGN,
  UPDATE_ORDERS_TO_ASSIGN_FILTER,

  ASSIGN_ORDERS_TO_DISTRIBUTOR_REQUEST,
  ASSIGN_ORDERS_TO_DISTRIBUTOR_SUCCESS,
  ASSIGN_ORDERS_TO_DISTRIBUTOR_FAILED
} from '../constants/actions';

export const toggleOrderToAssign = () => orderId => ({
  type: TOGGLE_ORDER_TO_ASSIGN,
  orderId
});

export const updateOrdersToAssignList = orders => ({
  type: UPDATE_ORDERS_TO_ASSIGN_LIST,
  orders
});

export const updateDistributorUserToAssign = distributorUser => ({
  type: UPDATE_DISTRIBUTOR_USER_TO_ASSIGN,
  distributorUser
});

export const updateOrdersToAssignFilter = (filter, value) => ({
  type: UPDATE_ORDERS_TO_ASSIGN_FILTER,
  filter,
  value
});

export const assignOrderToDistributorRequest = () => ({
  type: ASSIGN_ORDERS_TO_DISTRIBUTOR_REQUEST
});

export const assignOrderToDistributorSuccess = () => ({
  type: ASSIGN_ORDERS_TO_DISTRIBUTOR_SUCCESS
});

export const assignOrderToDistributorFailed = () => ({
  type: ASSIGN_ORDERS_TO_DISTRIBUTOR_FAILED
});
