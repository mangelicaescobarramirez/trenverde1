import {Router} from "express";
import { registrar, 
  logearse, 
  logout, 
  profileadm,
  listarBoletasadm, 
  listarVentasadm,
  listarUsuarios,
  habilitarUsuario, 
  deshabilitarUsuario,
  verifyToken
} from "../controllers/adm.controller.js";
import {auth}from "../middlewares/validatetoken.js"
import {auth1}from "../middlewares/usertoken.js"

import { registrarUsuario,
   iniciarSesionUsuario, 
   cerrarSesionUsuario, 
   profileuser,
   verifyToken1 } from "../controllers/usuario.controller.js";
import {
    listarProductos,
    obtenerProductoPorId,
    crearProducto,
    modificarProducto,
    eliminarProducto,
    buscarProductoPorNombre,
  } from "../controllers/producto.controller.js";

import {
  listarVentas,
  obtenerVentaPorId,
  crearVenta,
  modificarVenta,
  eliminarVenta
} from "../controllers/venta.controller.js";

import {
  listarBoletas,
  obtenerBoletaPorId,
  crearBoleta,
  modificarBoleta,
  eliminarBoleta
} from "../controllers/boleta.controller.js";

import {
  listarPlantas,
  obtenerPlantaPorId,
  crearPlanta,
  modificarPlanta,
  eliminarPlanta
} from "../controllers/planta.controller.js";



const router  =  Router ();

router.post("/registrarse", registrar);
router.post("/logearse", logearse);
router.post("/logout",logout );
router.get("/profileadmin",auth, profileadm);
// Ruta para listar todas las boletas
router.get('/boletas',auth, listarBoletasadm);
// Ruta para listar todas las ventas
router.get('/ventas',auth, listarVentasadm);
router.get('/listarUsuarios', auth, listarUsuarios)
// Agrega las rutas para habilitar y deshabilitar usuarios
router.put('/usuarios/:idUsuario/habilitar', auth, habilitarUsuario);
router.put('/usuarios/:idUsuario/deshabilitar', auth, deshabilitarUsuario);

router.get("/verifyadm", verifyToken);
router.get("/verifyuser", verifyToken1);


router.post("/registraruser", registrarUsuario);
router.post("/logearuser", iniciarSesionUsuario);
router.post("/logoutuser", cerrarSesionUsuario);
router.get("/profileuser",auth1, profileuser);

router.get("/productos", listarProductos);
router.get("/productos/:id", obtenerProductoPorId);
router.post("/productos",auth, crearProducto);
router.put("/productos/:id", modificarProducto);
router.delete("/productos/:id", eliminarProducto);
router.get("/buscar-producto/:nombre", buscarProductoPorNombre);


// Venta routes
router.get("/venta", auth, listarVentas);
router.get("/venta/:id", auth, obtenerVentaPorId);
router.post("/venta", auth, crearVenta);
router.put("/venta/:id",auth, modificarVenta);
router.delete("/venta/:id",auth, eliminarVenta);

// Boleta routes
router.get("/boleta", auth1, listarBoletas);
router.get("/boleta/:id", auth1,obtenerBoletaPorId);
router.post("/boleta",auth1, crearBoleta);
router.put("/boleta/:id", auth1, modificarBoleta);
router.delete("/boleta/:id",auth1, eliminarBoleta);

// Planta routes
router.get("/plantas", listarPlantas);
router.get("/planta/:id_planta", obtenerPlantaPorId);
router.post("/planta", auth, crearPlanta);
router.put("/planta/:id", modificarPlanta);
router.delete("/planta/:id", eliminarPlanta);

export default router