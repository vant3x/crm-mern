import React, { useEffect, useState, Fragment } from 'react';
import { Helmet } from 'react-helmet';  
import { withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axiosConfig';

import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';
import Swal from 'sweetalert2';

function NuevoPedido(props) {

    // extraer id de cliente
    const { id } = props.match.params;

    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]);
    const [total, guardarTotal] = useState(0);

    useEffect(() => {
        // obtener el cliente
        const fetchAPI = async () => {
            const clienteActual = await clienteAxios.get(`/clientes/${id}`);
            guardarCliente(clienteActual.data);
        }

        fetchAPI();

        // total a pagar actualizar
        actualizarTotal();

    }, [productos]);

    const buscarProducto = async e => {
        e.preventDefault();

        // obtener los productos de la busqueda
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);

        // si no hay resultados  una alerta
        if (resultadoBusqueda.data[0]) {
            let productoResultado = resultadoBusqueda.data[0];
            // llave producto es necesaria
            productoResultado.producto = resultadoBusqueda.data[0]._id;
            productoResultado.cantidad = 0;

            guardarProductos([...productos, productoResultado]);
            
        } else {
            Swal.fire({
                type: 'error',
                title: 'Lo sentimos',
                text: 'No se encontraron resultados relacionados a la búsqueda'
            })
          
        }

        console.log(resultadoBusqueda.data);
        
    }

    const leerDatosBusqueda = e => {
        guardarBusqueda(e.target.value);
        
    }

    // actualizar cantidad de productos
    const restarProductos = i => {
        // copiar el arreglo original
        const todosProductos = [...productos];

        // validar si está en 0 no puede ir más allá
        if (todosProductos[i].cantidad === 0) return;

        // decremento
        todosProductos[i].cantidad--;

        // almacenarlo en el state
        guardarProductos(todosProductos);

    }

    const aumentarProductos = i => {
        const todosProductos = [...productos];

        // incremento 
        todosProductos[i].cantidad++;

        // almacenarlo en el state 
        guardarProductos(todosProductos);
    }

    // elimina un producto del state
    const eliminarProductoPedido = id => {
        const todosProductos = productos.filter(producto => producto.producto !== id);

        guardarProductos(todosProductos);
    } 

    // actualizar total a pagar
    const actualizarTotal = () => {
        // si el arreglo de productos es igual a 0: el total es 0
        if (productos.length === 0) {
            guardarTotal(0);
            return;
        }

        // calcular nuevo total
        let nuevoTotal = 0;
        // recorrer todos los productos y sus cantidades y precios
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        // almacenar el total
        guardarTotal(nuevoTotal);
    }

    const realizarPedido = async e => {
        e.preventDefault();

        // extraer el id
        const { id } = props.match.params;

        // construir el objeto
        const pedido = {
             "cliente": id,
             "pedido": productos,
             "total": total
        }

        // almacenar en la bd
        const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);

        // leer resultado
        if (resultado.status === 200) {
            Swal.fire({
                type:'success',
                title: 'El pedido se creó con éxito',
                text: resultado.data.mensaje
            })
        } else {
            Swal.fire({
                type: 'error',
                title: 'Lo sentimos, hubo un error',
                text: 'Vuelva a intentarlo'
            })
        }

        // redireccionar
        props.history.push('/pedidos');
    }

    return(
        <Fragment>  
            <Helmet>
                <meta charSet="utf-8" />
                <title>Nuevo Pedido</title>
            </Helmet>
     
            <h2>Nuevo Pedido</h2>   
            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p className="margin-lr"><b className="title-azul">Nombre:</b>  {cliente.nombre} {cliente.apellido}</p>
                <span className="margin-lr"><b className="title-azul">Empresa:</b> {cliente.empresa}</span>
            </div>

                <FormBuscarProducto
                    buscarProducto={buscarProducto}
                    leerDatosBusqueda={leerDatosBusqueda}
                />

                <ul className="resumen">

                   {productos.map((producto, index) => (
                       <FormCantidadProducto
                          key={producto.producto}
                          producto={producto}
                          restarProductos={restarProductos}
                          aumentarProductos={aumentarProductos}
                          eliminarProductoPedido={eliminarProductoPedido}
                          index={index}
                       />
                   ))}
                  
                </ul>

                <p className="total">Total a Pagar: <span>$ {total} </span></p>
               {total > 0 ? (
                   <form onSubmit={realizarPedido}>
                        <input type="submit" value="Realizar Pedido" className="btn btn-verde btn-block"  />           
                   </form>
               ) : null}
          
        </Fragment>
    )
}

export default withRouter(NuevoPedido);