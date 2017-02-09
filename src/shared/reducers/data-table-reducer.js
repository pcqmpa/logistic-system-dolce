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
  CLEAR_SERIALIZED_DATA_TABLE,
  TOGGLE_DATA_TABLE_ELEMENT,
  TOGGLE_DATA_TABLE_ELEMENTS
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
 * Helper to handle the toggle of an element of the data set.
 * @param {Array} chunk -> A chunk of the data set.
 * @param {String} id -> The Id of the specific element.
 * @returns {Array} -> The updated chunk.
 */
const toggleChunkElement = (chunk, id) => (
  chunk.map((element) => {
    if (element.id === id) {
      return {
        ...element,
        checked: !element.checked
      };
    }
    return element;
  })
);

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
  }),
  [TOGGLE_DATA_TABLE_ELEMENT]: (state, { table, chunkId, id }) => ({
    ...state,
    [table]: {
      ...state[table],
      listData: state[table].listData.map((chunk) => {
        if (chunk.id === chunkId) {
          return {
            ...chunk,
            list: toggleChunkElement(chunk.list, id)
          };
        }
        return chunk;
      }),
      selectedData: {
        ...state[table].selectedData,
        list: toggleChunkElement(
          state[table].selectedData.list,
          id
        )
      }
    }
  }),
  [TOGGLE_DATA_TABLE_ELEMENTS]: (state, { table, checked }) => ({
    ...state,
    [table]: {
      ...state[table],
      listData: state[table].listData.map(chunk => ({
        ...chunk,
        list: chunk.list.map(element => ({
          ...element,
          checked
        }))
      })),
      selectedData: {
        ...state[table].selectedData,
        list: state[table].selectedData
          .list.map(element => ({
            ...element,
            checked
          }))
      }
    }
  })
};

export default createReducer(initialState, actionHandlers);
