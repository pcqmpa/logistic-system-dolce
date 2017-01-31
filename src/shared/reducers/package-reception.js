import { createReducer } from 'redux-create-reducer';

// Helper.
import ZoneOrders from './helper-reducers/zone-orders';

// Actions.
import {
  UPDATE_CAMPAIGNS,
  SELECT_CAMPAIGN,
  TOGGLE_SELECT_ALL,
  TOGGLE_ORDER
} from '../constants/actions';

//
// Initial State.
// -----------------------------------------------------------------------------

/**
 * Function to add a new orders zone.
 * @param {Number} zoneId -> The zone id.
 * @param {Object} order -> The order to init the list.
 * @returns {Object} -> The new orders zone.
 */
// const newOrderSelected = (zoneId, order) => ({
//   zoneId,
//   orders: [order]
// });

/**
 * Initial state
 * @type {Object}
 */
const initialState = {
  ordersList: [],
  selectedOrders: []
};

const actionHandlers = {
  [UPDATE_CAMPAIGNS]: (state, { campaigns }) => ({
    ...state,
    campaigns
  }),
  [SELECT_CAMPAIGN]: (state, { campaignSelected }) => ({
    ...state,
    campaignSelected
  }),
  [TOGGLE_SELECT_ALL]: state => ({
    ...state,
    selectAll: !state.selectAll
  }),
  [TOGGLE_ORDER]: (state, action) => ({
    ...state,
    campaignSelected: {
      ...state.campaignSelected,
      zones: state.campaignSelected.zones.map((zone) => {
        if (zone.id === action.zoneId) {
          return {
            ...zone,
            orders: ZoneOrders[action.type](zone, action)
          };
        }
        return zone;
      })
    }
  })
};

export default createReducer(initialState, actionHandlers);
