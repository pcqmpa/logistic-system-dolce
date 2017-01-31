/**
 * Module with a series of serialization functions.
 * @module src/shared/utils/serializer
 */
// Node.
import splitArray from 'split-array';

// Constants.
import {
  DISTRIBUTOR,
  TRANSPORTER_STRING,
  DISTRIBUTOR_STRING,
  DIRECTOR_STRING,
  ADMIN_STRING
} from '../constants/user-types';
import { CHUNK_QUANTITY } from '../constants/values';

// User Types.
const userTypes = [
  TRANSPORTER_STRING,
  DISTRIBUTOR_STRING,
  DIRECTOR_STRING,
  ADMIN_STRING
];

/**
 * Returns the user type based on the id.
 * @private
 * @param  {String} typeId -> The id of the type.
 * @return {String} -> The user type.
 */
const getUserType = typeId => (userTypes[typeId - 1]);

/**
 * Serialize new user form.
 * @param  {Object} data -> The form data.
 * @return {Object} -> The serialized object.
 */
const toNewUser = data => ({
  StrUsuario: data.username,
  StrPassword: data.password,
  StrNombre: data.fullname,
  IdTipo: data.type,
  StrNombreTipoUsuario: getUserType(data.type)
});

/**
 * Serialize distributor users.
 * @param {Array} users -> The array of users.
 * @return {Array} -> The serialized array.
 */
const toDistributorUsers = users => (
  users
    .filter(user => (user.IdTipo === DISTRIBUTOR))
    .map(user => ({
      id: user.Idusuario,
      assign: false
    }))
);

/**
 * Serialize to data table set.
 * @param {Array} data -> The array of data.
 * @return {Array} -> The serialized array.
 */
const toDataTableSet = data => (
  splitArray(data, CHUNK_QUANTITY)
    .map((chunk, id) => ({ id, list: chunk }))
);

/**
 * Serialize to data table paginator data.
 * @param {Array} data -> The array of data.
 * @return {Array} -> The serialized array.
 */
const toDataTablePaginators = data => (
  data.map(chunk => (
    { value: chunk.id, text: chunk.id + 1 }
  ))
);

/**
 * Serialize to package reception orders summary.
 * @param {Array} data -> The array of data.
 * @return {Array} -> The serialized array.
 */
// const toOrdersSummary = data => (
//   data.map()
// );

export default {
  toNewUser,
  toDistributorUsers,
  toDataTableSet,
  toDataTablePaginators
};
