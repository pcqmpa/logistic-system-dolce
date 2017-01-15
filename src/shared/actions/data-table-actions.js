/**
 * Module with the data table set actions.
 * @module src/shared/actions/data-table-actions
 */
import {
  UPDATE_SERIALIZED_DATA_TABLE,
  UPDATE_SELECTED_DATA_TABLE,
  CLEAR_SERIALIZED_DATA_TABLE
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
