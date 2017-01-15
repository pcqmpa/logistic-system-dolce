/**
 * Module with the transporters reducer actions.
 * @module src/shared/actions/transporters-actions
 */
// Constants.
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

// Transporters List Actions.
export const initTransporterList = list => ({
  type: INIT_TRANSPORTER_LIST,
  list
});

export const updateTransporterList = list => ({
  type: UPDATE_TRANSPORTER_LIST,
  list
});

// Transporters Assign Actions.
export const updateTransporterFormUser = (idUser, nameUser) => ({
  type: UPDATE_TRANSPORTER_FORM_USER,
  idUser,
  nameUser
});

export const updateTransporterFormMaster = idTransporter => ({
  type: UPDATE_TRANSPORTER_FORM_MASTER,
  idTransporter
});

export const assignTransporterRequest = () => ({
  type: ASSIGN_TRANSPORTER_REQUEST
});

export const assignTransporterSuccess = () => ({
  type: ASSIGN_TRANSPORTER_SUCCESS
});

export const assignTransporterFailed = () => ({
  type: ASSIGN_TRANSPORTER_FAILED
});

// Distributors Assign Actions.
export const updateDistributorFormList = distributors => ({
  type: UPDATE_DISTRIBUTOR_FORM_LIST,
  distributors
});

export const updateDistributorFormTransporter = (idTransporter, nameTransporter) => ({
  type: UPDATE_DISTRIBUTOR_FORM_TRANSPORTER,
  idTransporter,
  nameTransporter
});

export const updateDistributorFormDistributors = idDistributor => ({
  type: UPDATE_DISTRIBUTOR_FORM_DISTRIBUTORS,
  idDistributor
});

export const assignDistributorRequest = () => ({
  type: ASSIGN_DISTRIBUTOR_REQUEST
});

export const assignDistributorSuccess = () => ({
  type: ASSIGN_DISTRIBUTOR_SUCCESS
});

export const assignDistributorFailed = () => ({
  type: ASSIGN_DISTRIBUTOR_FAILED
});
