/**
 * Module with the data serialized for the table set.
 * @module src/shared/reducers/data-table-reducer
 */
// Redux.
import { createReducer } from 'redux-create-reducer';

// Lib.
import serializer from '../lib/serializer';

// Actions.
import {
  UPDATE_SERIALIZED_DATA_TABLE,
  UPDATE_SELECTED_DATA_TABLE,
  CLEAR_SERIALIZED_DATA_TABLE
} from '../constants/actions';

//
// Initial State.
// -----------------------------------------------------------------------------

/**
 * Initial data set.
 * @type {Object}
 */
const initialDataSet = {
  listData: [],
  selectedData: {},
  paginators: []
};

/**
 * Reducer initial state.
 * @type {Object}
 */
const initialState = {
  transporterFormTable: initialDataSet,
  distributorFormTable: initialDataSet,
  packageReceptionFormTable: initialDataSet
};

//
// Handlers.
// -----------------------------------------------------------------------------

/**
 * Data table action handlers.
 * @type {Object}
 */
const actionHandlers = {
  [UPDATE_SERIALIZED_DATA_TABLE]: (state, { table, data }) => {
    const listData = serializer.toDataTableSet(data);
    const paginators = serializer.toDataTablePaginators(listData);
    const [selectedData] = listData;
    return {
      ...state,
      [table]: {
        ...state[table],
        listData,
        paginators,
        selectedData: selectedData || {}
      }
    };
  },
  [UPDATE_SELECTED_DATA_TABLE]: (state, { table, selected }) => {
    const [selectedData] = state[table].listData
      .filter(chunk => (chunk.id === selected));
    return {
      ...state,
      [table]: {
        ...state[table],
        selectedData
      }
    };
  },
  [CLEAR_SERIALIZED_DATA_TABLE]: (state, { table }) => ({
    ...state,
    [table]: initialDataSet
  })
};

export default createReducer(initialState, actionHandlers);
