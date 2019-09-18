const Clientes = require('../models/Clientes');

// agrega un nuevo cliente

exports.nuevoCliente = async (req, res) => {
    const cliente = new Clientes(req.body);

    try {
        // almacenar el registro
        await cliente.save();
        res.json({ mensaje: 'Se agregó un nuevo cliente'});
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

// mostrar todos los clientes
exports.mostrarClientes = async (req, res) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

// mostrar cliente en especifico
exports.mostrarCliente = async (req, res, next) => {
    const cliente = await Clientes.findById(req.params.idCliente);

    if (!cliente) {
        res.json({mensaje: "El cliente buscado no existe"});
        next();
    }
    // Mostrar el cliente
     res.json(cliente);
   
}

// Actualiza un cliente 
exports.actualizarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({_id : req.params.idCliente}, 
            req.body, {
                new: true
            });
            res.json(cliente);  
            
    } catch (eror) {
        res.send(error);
        next();
    }
} 

// Eliminar un cliente

exports.eliminarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findByIdAndDelete({_id : req.params.idCliente});
        res.json({mensaje: `El cliente ${cliente.nombre} se ha eliminado`});
    } catch (eror) {
        console.log(error);
    }
}