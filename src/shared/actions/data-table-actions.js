/**
 * Module with the data table set actions.
 * @module src/shared/actions/data-table-actions
 */
import {
  UPDATE_SERIALIZED_DATA_TABLE,
  UPDATE_SELECTED_DATA_TABLE,
  CLEAR_SERIALIZED_DATA_TABLE,
  TOGGLE_DATA_TABLE_ELEMENT,
  TOGGLE_DATA_TABLE_ELEMENTS
} from '../constants/actions';

export const updateSerializedDataTable = (table, data) => ({
  type: UPDATE_SERIALIZED_DATA_TABLE,
  table,
  data
});

export const updateSelectedDataTable = (table, selected) => ({
  type: UPDATE_SELECTED_DATA_TABLE,
  table,
  selected
});

export const clearSerializedDataTable = table => ({
  type: CLEAR_SERIALIZED_DATA_TABLE,
  table
});

export const toggleDataTableElement = (table, chunkId, id) => ({
  type: TOGGLE_DATA_TABLE_ELEMENT,
  id,
  chunkId,
  table
});

export const toggleDataTableElements = (table, checked) => ({
  type: TOGGLE_DATA_TABLE_ELEMENTS,
  table,
  checked
});
