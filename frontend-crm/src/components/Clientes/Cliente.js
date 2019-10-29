import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axiosConfig';

function Cliente({cliente}) {
    // extraer los valores
    const {_id, nombre, apellido, empresa, email, telefono } = cliente;

    // Eliminr cliente
    const eliminarCliente = idCliente => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Un cliente eliminado no se puede recuperar",
            type:'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d333',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
               clienteAxios.delete(`/clientes/${idCliente}`)
                 .then(res => {
                    Swal.fire(
                        'Eliminado ',
                         res.data.mensaje,
                        'success'
                    );
                 })
            }
        })
    }

    return (
        <React.Fragment>
            <li className="cliente animated fadeIn">
                <div className="info-cliente">
                    <p className="nombre">{nombre} {apellido}</p>
                    <p className="empresa">{empresa}</p>
                    <p>{email}</p>
                    <p>{telefono}</p>
                </div>
                <div className="acciones">
                    
                    <Link to={`/clientes/editar/${_id}`} className="btn btn-azul"> 
                         <i className="fas fa-pen"></i> Editar Cliente
                    </Link>

                    <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-azul-claro margin-tb2"> 
                         <i className="fas fa-plus"></i> Nuevo Pedido
                    </Link>

                    <button 
                        className="btn btn-rojo" 
                        onClick={() => eliminarCliente(_id)}>
                        <i className="fas fa-times"></i> 
                        Eliminar Cliente
                    </button>
                </div>
            </li>
        </React.Fragment>
    );
}

export default Cliente; 