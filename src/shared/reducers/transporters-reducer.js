/**
 * Module with the transporters redux reducer.
 * @module src/shared/reducers/transporters-reducer
 */
// Redux.
import { createReducer } from 'redux-create-reducer';

// Actions.
import {
  INIT_TRANSPORTER_LIST,
  UPDATE_TRANSPORTER_LIST,

  UPDATE_ASSIGN_TRANSPORTER_FORM,
  ASSIGN_TRANSPORTER_SUCCESS,
  ASSIGN_TRANSPORTER_FAILED,

  UPDATE_DISTRIBUTOR_FORM_LIST,
  UPDATE_DISTRIBUTOR_FORM_TRANSPORTER,
  UPDATE_DISTRIBUTOR_FORM_DISTRIBUTORS,
  ASSIGN_DISTRIBUTOR_SUCCESS,
  ASSIGN_DISTRIBUTOR_FAILED
} from '../constants/actions';

//
// Initial State.
// -----------------------------------------------------------------------------

/**
 * Distributor form.
 * @type {Object}
 */
const distributorForm = {
  idTransporter: null,
  nameTransporter: '',
  distributors: [],
  isSubmitting: false,
  failed: false
};

/**
 * Transporter form.
 * @type {Object}
 */
const transporterForm = {
  idUser: null,
  nameUser: '',
  idTransporter: null,
  isSubmitting: false,
  failed: false
};

/**
 * Reducer initial state.
 * @type {Object}
 */
const initialState = {
  list: [],
  transporterForm,
  distributorForm
};

//
// Handlers.
// -----------------------------------------------------------------------------

/**
 * Updates the transporters list.
 * @param {Object} state -> The app state.
 * @param {Array} list -> The new transporters list.
 * @returns {Object} -> The new state.
 */
const updateTransportersList = (state, { list }) => ({
  ...state,
  list
});

/**
 * Form rules action handlers.
 * @type {Object}
 */
const actionHandlers = {
  [INIT_TRANSPORTER_LIST]: updateTransportersList,
  [UPDATE_TRANSPORTER_LIST]: updateTransportersList,

  [UPDATE_ASSIGN_TRANSPORTER_FORM]: (state, { input, value }) => ({
    ...state,
    transporterForm: {
      ...state.transporterForm,
      [input]: value
    }
  }),
  [ASSIGN_TRANSPORTER_SUCCESS]: state => ({
    ...state,
    transporterForm
  }),
  [ASSIGN_TRANSPORTER_FAILED]: state => ({
    ...state,
    transporterForm: {
      ...state.transporterForm,
      isSubmitting: false,
      failed: true
    }
  }),

  [UPDATE_DISTRIBUTOR_FORM_LIST]: (state, { distributors }) => ({
    ...state,
    distributorForm: {
      ...state.distributorForm,
      distributors
    }
  }),
  [UPDATE_DISTRIBUTOR_FORM_TRANSPORTER]: (state, { transporter }) => ({
    ...state,
    distributorForm: {
      ...state.distributorForm,
      idTransporter: transporter.IdUsuario,
      nameTransporter: transporter.StrNombre
    }
  }),
  [UPDATE_DISTRIBUTOR_FORM_DISTRIBUTORS]: (state, { idDistributor }) => ({
    ...state,
    distributorForm: {
      ...state.distributorForm,
      distributors: state.distributors
        .map((distributor) => {
          if (distributor.id !== idDistributor) {
            return distributor;
          }
          return {
            ...distributor,
            assign: !distributor.assign
          };
        })
    }
  }),
  [ASSIGN_DISTRIBUTOR_SUCCESS]: state => ({
    ...state,
    distributorForm
  }),
  [ASSIGN_DISTRIBUTOR_FAILED]: state => ({
    ...state,
    distributorForm: {
      ...state.distributorForm,
      isSubmitting: false,
      failed: true
    }
  })
};

export default createReducer(initialState, actionHandlers);
