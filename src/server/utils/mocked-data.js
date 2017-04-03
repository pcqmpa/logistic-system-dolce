/**
 * Module with mocked data.
 * @module src/server/utils/mocked-data
 */
// Constants.
import { DISTRIB_1 } from '../constants/mocked-users';

//
// Users.
// -----------------------------------------------------------------------------

/**
 * Mobile distributor orders.
 * @type {Object}
 */
const orders = [
  {
    StrCampaña: '001',
    IdTransportista: 1,
    NumPedido: 15523656,
    StrZona: '002',
    StrIdentificacion: '1234567790',
    StrNombreAsesora: 'Anne Brown',
    StrTelefono: '3001020390',
    StrDireccion: 'Cra 45 No 45-56',
    StrBarrio: 'Laureles',
    StrDepartamento: 'Antioquia',
    StrCiudad: 'Medellin',
    StrPoblacion: 'Medellin',
    StrTipoEmpaque: 'Paquete'
  }
];

/**
 * Mobile distributor user.
 * @type {Object}
 */
const user = {
  username: 'Distrib123',
  password: 'pwd123',
  IdUsuario: 1,
  StrUsuario: 'Distrib123',
  StrPassword: '',
  StrNombre: 'Ditribuidor Prueba',
  IdTipo: 2,
  StrNombreTipoUsuario: 'Distribuidor',
  LogEstado: true,
  StrMensaje: 'Success',
  LogValido: true
};

const users = {
  [DISTRIB_1]: {
    user,
    orders
  }
};

export default { users };
