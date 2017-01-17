/**
 * Module with transporters filter sub redux reducer.
 * @module  src/shared/reducers/helper-reducers/transporters-filter-reducer
 */
// Actions.
import {
  UPDATE_TRANSPORTERS_FILTER
} from '../../constants/actions';

//
// Initial State.
// -----------------------------------------------------------------------------

/**
 * Initial State object.
 * @type {Object}
 */
const initialState = {
  transportersFilter: '',
  distributorsFilter: ''
};

//
// Handlers.
// -----------------------------------------------------------------------------

const actionHandlers = {
  [UPDATE_TRANSPORTERS_FILTER]: (state, { filter, value }) => ({
    ...state,
    filters: {
      ...state.filters,
      [filter]: value
    }
  })
};

export default { initialState, actionHandlers };
