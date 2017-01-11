/**
 * Module with a series of serialization functions.
 * @module src/shared/utils/serializer
 */
import {
  TRANSPORTER_STRING,
  DISTRIBUTOR_STRING,
  DIRECTOR_STRING,
  ADMIN_STRING
} from '../constants/user-types';

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

export default { toNewUser };
