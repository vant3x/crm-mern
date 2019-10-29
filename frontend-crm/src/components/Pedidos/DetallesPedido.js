import React from 'react';
import clienteAxios from '../../config/axiosConfig';
import Swal from 'sweetalert2';

function DetallesPedido({pedido}) {

    const {cliente} = pedido;

    const eliminarPedido = id => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Un pedido cancelado no se puede recuperar",
            type:'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d333',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                    clienteAxios.delete(`/pedidos/${pedido._id}`)
                        .then(res => {
                            if (res.status ===  200) {
                                Swal.fire(
                                    'Cancelado ',
                                     res.data.mensaje,
                                    'success'
                            )
                        }     
                    })
                }       
            })
    }

    return(
        <li className="pedido">
            <div className="info-pedido">
                    <p className="id">ID: 0192019201291201</p>
                    <p className="nombre">Cliente: { cliente.nombre } {cliente.apellido} </p>

                    <div className="articulos-pedido">
                        <p className="productos">Artículos Pedido: </p>
                        <ul  className="margin-lr">
                            
                                {pedido.pedido.map(articulos => (
                                    <li key={pedido._id+articulos.producto._id  }>
                                        <p>{articulos.producto.nombre}</p>
                                        <p>Precio: <span className="span-blue">${articulos.producto.precio}</span></p>
                                        <p>Cantidad: <span className="span-blue">{articulos.cantidad}</span></p>
                                    </li>
                                ))}
                                
                        </ul>
                    </div>
                    <p className="total">Total: ${pedido.total} </p>
                </div>
                <div className="acciones">
                    <a href="#" className="btn btn-azul">
                        <i className="fas fa-pen"></i>
                        Editar Pedido
                    </a>

                    <button type="button" 
                        className="btn btn-rojo btn-eliminar"
                        onClick={() => eliminarPedido()}
                    >
                        <i className="fas fa-times"></i>
                        Cancelar Pedido
                    </button>
                </div>
            </li>
    );
}

export default DetallesPedido;