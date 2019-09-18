const { Router } = require('express');
const router = Router();

const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('./../controllers/usuariosController');

// -------***--- Rutas clientes --------***---

// agrgegar nuevos clientes
router.post('/clientes', clienteController.nuevoCliente);

// Obtener todos los clientes
router.get('/clientes', clienteController.mostrarClientes);

// Obtener un cliente en especifico por ID
router.get('/clientes/:idCliente', clienteController.mostrarCliente);

// Actualizar cliente
router.put('/clientes/:idCliente', clienteController.actualizarCliente);

// Eliminar cliente 
router.delete('/clientes/:idCliente', clienteController.eliminarCliente);


// -------***--- Rutas Productos --------***---
// nuevo producto
router.post('/productos', 
    productosController.subirArchivo,
    productosController.nuevoProducto
);

// mostrar productos
router.get('/productos',  productosController.mostrarProductos);

// mostrar producto especifico por su id
router.get('/productos/:idProducto', productosController.mostrarProducto);

// actualizar productos 
router.put('/productos/:idProducto', 
    productosController.subirArchivo,
    productosController.actualizarProducto
);

// eliminar producto 
router.delete('/productos/:idProducto', 
    productosController.eliminarProducto
);

// Busqueda de producto
router.post('/productos/busqueda/:query', productosController.buscarProducto);

// -------***--- Rutas Pedidos --------***---

//  Agrega nuevo pedido
router.post('/pedidos/nuevo/:idUsuario', pedidosController.nuevoPedido);

// mostrar todos los pedidos 
router.get('/pedidos', pedidosController.mostrarPedidos);

// mostrar un pedido por su id
router.get('/pedidos/:idPedido', pedidosController.mostrarPedido);

// actualizar pedidos 
router.put('/pedidos/:idPedido', pedidosController.actualizarPedido);

// eliminar un pedido 
router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);

// Usuarios
router.post('/registrar', usuariosController.registrarUsuario);

router.post('/login', usuariosController.autenticarUsuario);

module.exports = router;