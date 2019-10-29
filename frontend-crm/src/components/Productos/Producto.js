import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axiosConfig';


function Producto(props) {

   const eliminarProducto = id => {
       console.log('eliminando...', id);
       Swal.fire({
        title: '¿Estás seguro?',
        text: "Un producto eliminado no se puede recuperar",
        type:'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d333',
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
                clienteAxios.delete(`/productos/${_id}`)
                    .then(res => {
                        if (res.status ===  200) {
                            Swal.fire(
                                'Eliminado ',
                                 res.data.mensaje,
                                'success'
                        )
                    }     
                })
            }       
        })
  
   }

    const {_id, nombre, precio, imagen} = props.producto;

    return (
        <Fragment>
              <li className="producto animated fadeIn">
                    <div className="info-producto">
                        <p className="nombre">{nombre}</p>
                        <p className="precio">$ {precio}</p>
                        { imagen ? (
                            <img className="img-producto" src={`http://localhost:5000/${imagen}`} alt=""/>
                        ) : <null></null> }
                    </div>
                    <div className="acciones">
                        <Link to={`/productos/editar/${_id}`} className="btn btn-azul margin-tb"> 
                            <i className="fas fa-pen"></i> Editar Producto
                        </Link>
                        <button 
                            className="btn btn-rojo" 
                            onClick={() => eliminarProducto(_id)}
                            >
                            <i className="fas fa-times"></i> 
                            Eliminar Producto
                        </button>
                    </div>
                </li>
        </Fragment>
    )
}

export default Producto;