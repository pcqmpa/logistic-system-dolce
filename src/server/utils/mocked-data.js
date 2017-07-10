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
    Id: 1,
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
    StrTipoEmpaque: 'Paquete',
    Entegado: false
  },
  {
    Id: 2,
    StrCampaña: '001',
    IdTransportista: 1,
    NumPedido: 15523657,
    StrZona: '002',
    StrIdentificacion: '1234567790',
    StrNombreAsesora: 'Anne Brown',
    StrTelefono: '3001020390',
    StrDireccion: 'Cra 45 No 45-56',
    StrBarrio: 'Laureles',
    StrDepartamento: 'Antioquia',
    StrCiudad: 'Medellin',
    StrPoblacion: 'Medellin',
    StrTipoEmpaque: 'Paquete',
    Entegado: false
  },
  {
    Id: 3,
    StrCampaña: '001',
    IdTransportista: 1,
    NumPedido: 15523658,
    StrZona: '002',
    StrIdentificacion: '1234567790',
    StrNombreAsesora: 'Anne Brown',
    StrTelefono: '3001020390',
    StrDireccion: 'Cra 45 No 45-56',
    StrBarrio: 'Laureles',
    StrDepartamento: 'Antioquia',
    StrCiudad: 'Medellin',
    StrPoblacion: 'Medellin',
    StrTipoEmpaque: 'Paquete',
    Entegado: false
  },
  {
    Id: 4,
    StrCampaña: '001',
    IdTransportista: 1,
    NumPedido: 15523668,
    StrZona: '004',
    StrIdentificacion: '1234567790',
    StrNombreAsesora: 'Anne Brown',
    StrTelefono: '3001020390',
    StrDireccion: 'Cra 45 No 45-56',
    StrBarrio: 'Laureles',
    StrDepartamento: 'Antioquia',
    StrCiudad: 'Medellin',
    StrPoblacion: 'Medellin',
    StrTipoEmpaque: 'Paquete',
    Entegado: false
  },
  {
    Id: 5,
    StrCampaña: '001',
    IdTransportista: 1,
    NumPedido: 15523669,
    StrZona: '004',
    StrIdentificacion: '1234567790',
    StrNombreAsesora: 'Anne Brown',
    StrTelefono: '3001020390',
    StrDireccion: 'Cra 45 No 45-56',
    StrBarrio: 'Laureles',
    StrDepartamento: 'Antioquia',
    StrCiudad: 'Medellin',
    StrPoblacion: 'Medellin',
    StrTipoEmpaque: 'Paquete',
    Entegado: false
  },
  {
    Id: 6,
    StrCampaña: '001',
    IdTransportista: 1,
    NumPedido: 15523688,
    StrZona: '006',
    StrIdentificacion: '1234567790',
    StrNombreAsesora: 'Anne Brown',
    StrTelefono: '3001020390',
    StrDireccion: 'Cra 45 No 45-56',
    StrBarrio: 'Laureles',
    StrDepartamento: 'Antioquia',
    StrCiudad: 'Medellin',
    StrPoblacion: 'Medellin',
    StrTipoEmpaque: 'Paquete',
    Entegado: false
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

export default { users, orders };
