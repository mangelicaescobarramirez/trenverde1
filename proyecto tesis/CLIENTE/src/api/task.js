import axios from './auth'; // Suponiendo que './auth' contiene la instancia Axios con las cabeceras y configuraciones adecuadas

// Registro de usuario
export const solicitudRegistroUsuario = (usuario) => axios.post(`/registraruser`, usuario);



// Inicio de sesión de administrador
export const solicitudInicioSesionAdm = (adm) => axios.post(`/logearse`, adm);

// Inicio de sesión de usuario
export const solicitudInicioSesionUsuario = (usuario) => axios.post(`/logearuser`, usuario);

export const listarUsuario  = (adm) => axios.get(`/listarUsuarios`, adm);


// Cerrar sesión de usuario
export const solicitudCerrarSesionUsuario = () => axios.post('/logoutuser');

export const solicitudCerrarSesionAdm = ( ) => axios.post ('/logout');

// Perfil de usuario
export const solicitudPerfilUsuario = () => axios.get('/profileuser');

// Solicitudes relacionadas con productos
export const solicitudListarProductos = () => axios.get('/productos');
export const solicitudObtenerProductoPorId = (idProducto) => axios.get(`/productos/${idProducto}`);
export const solicitudCrearProducto = (producto) => axios.post('/productos', producto);
export const solicitudActualizarProducto = (idProducto, productoActualizado) => axios.put(`/productos/${idProducto}`, productoActualizado);
export const solicitudEliminarProducto = (idProducto) => axios.delete(`/productos/${idProducto}`);
export const solicitudBuscarProductoPorNombre = (nombreProducto) => axios.get(`/buscar-producto/${nombreProducto}`);

// Solicitudes relacionadas con ventas
export const solicitudListarVentas = () => axios.get('/venta');
export const solicitudObtenerVentaPorId = (idVenta) => axios.get(`/venta/${idVenta}`);
export const solicitudCrearVenta = (venta) => axios.post('/venta', venta);
export const solicitudActualizarVenta = (idVenta, ventaActualizada) => axios.put(`/venta/${idVenta}`, ventaActualizada);
export const solicitudEliminarVenta = (idVenta) => axios.delete(`/venta/${idVenta}`);

// Solicitudes relacionadas con boletas
export const solicitudListarBoletas = () => axios.get('/boleta');
export const solicitudObtenerBoletaPorId = (idBoleta) => axios.get(`/boleta/${idBoleta}`);
export const solicitudCrearBoleta = (boleta) => axios.post('/boleta', boleta);
export const solicitudActualizarBoleta = (idBoleta, boletaActualizada) => axios.put(`/boleta/${idBoleta}`, boletaActualizada);
export const solicitudEliminarBoleta = (idBoleta) => axios.delete(`/boleta/${idBoleta}`);

// Solicitudes relacionadas con plantas
export const solicitudListarPlantas = () => axios.get('/plantas');
export const solicitudObtenerPlantaPorId = (idPlanta) => axios.get(`/planta/${idPlanta}`);
export const solicitudCrearPlanta = (planta) => axios.post('/planta', planta);
export const solicitudActualizarPlanta = (idPlanta, plantaActualizada) => axios.put(`/planta/${idPlanta}`, plantaActualizada);
export const solicitudEliminarPlanta = (idPlanta) => axios.delete(`/planta/${idPlanta}`);
