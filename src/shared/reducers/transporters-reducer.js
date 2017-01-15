/**
 * Module with the transporters redux reducer.
 * @module src/shared/reducers/transporters-reducer
 */
// Redux.
import { createReducer } from 'redux-create-reducer';

// Lib.
import serializer from '../lib/serializer';

// Actions.
import {
  INIT_TRANSPORTER_LIST,
  UPDATE_TRANSPORTER_LIST,

  UPDATE_TRANSPORTER_FORM_USER,
  UPDATE_TRANSPORTER_FORM_MASTER,
  ASSIGN_TRANSPORTER_REQUEST,
  ASSIGN_TRANSPORTER_SUCCESS,
  ASSIGN_TRANSPORTER_FAILED,

  UPDATE_DISTRIBUTOR_FORM_LIST,
  UPDATE_DISTRIBUTOR_FORM_TRANSPORTER,
  UPDATE_DISTRIBUTOR_FORM_DISTRIBUTORS,
  ASSIGN_DISTRIBUTOR_REQUEST,
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
  idTransporter: '',
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
  idUser: '',
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

  [UPDATE_TRANSPORTER_FORM_USER]: (state, { idUser, nameUser }) => ({
    ...state,
    transporterForm: {
      ...state.transporterForm,
      idUser,
      nameUser
    }
  }),
  [UPDATE_TRANSPORTER_FORM_MASTER]: (state, { idTransporter }) => ({
    ...state,
    transporterForm: {
      ...state.transporterForm,
      idTransporter
    }
  }),
  [ASSIGN_TRANSPORTER_REQUEST]: state => ({
    ...state,
    transporterForm: {
      ...state.transporterForm,
      isSubmitting: true
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
      distributors: serializer.toDistributorUsers(distributors)
    }
  }),
  [UPDATE_DISTRIBUTOR_FORM_TRANSPORTER]: (state, { idTransporter, nameTransporter }) => ({
    ...state,
    distributorForm: {
      ...state.distributorForm,
      idTransporter,
      nameTransporter
    }
  }),
  [UPDATE_DISTRIBUTOR_FORM_DISTRIBUTORS]: (state, { idDistributor }) => ({
    ...state,
    distributorForm: {
      ...state.distributorForm,
      distributors: state.distributorForm
        .distributors
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
  [ASSIGN_DISTRIBUTOR_REQUEST]: state => ({
    ...state,
    distributorForm: {
      ...state.distributorForm,
      isSubmitting: true
    }
  }),
  [ASSIGN_DISTRIBUTOR_SUCCESS]: state => ({
    ...state,
    distributorForm: {
      ...state.distributorForm,
      idTransporter: '',
      nameTransporter: '',
      distributors: state.distributorForm.distributors
        .map(distributor => ({
          ...distributor,
          assign: false
        }))
    },
    isSubmitting: false
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
