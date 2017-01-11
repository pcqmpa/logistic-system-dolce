/**
 * Module with form rules redux actions.
 * @module src/shared/actions/form-rules-actions
 */
import {
  UPDATE_RULES_VALIDATION,
  CLEAR_RULES_VALIDATION
} from '../constants/actions';

/**
 * Action to update validation per form rules.
 * @param  {String} form -> Form type.
 * @param  {Object} data -> New validation data.
 * @return {Object} -> The action.
 */
export const updateRulesValidation = (form, data) => ({
  type: UPDATE_RULES_VALIDATION,
  form,
  data
});

/**
 * Action to clear validation rules.
 * @return {Object} -> The action.
 */
export const clearRulesValidation = () => ({ type: CLEAR_RULES_VALIDATION });
