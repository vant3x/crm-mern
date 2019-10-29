import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2'; 
import { withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axiosConfig';


function NuevoCliente({history}) {

    // cliente = state
    const [ cliente, guardarCliente ] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    // leer los datos del formulario
    const actualizarState = e => {
        // almacenar lo que el usuario escribe en el state
        guardarCliente({
            // copia estado actual
            ...cliente,
            [e.target.name] : e.target.value
        });
        console.log(cliente);
    }    
    
    // añade un nuevo cliente en la REST API
    const agregarCliente = (e) => {
        e.preventDefault();   

        clienteAxios.post('/clientes',  cliente)
            .then(res => {
                // validar si hay errores de mongo
                if (res.data.code === 11000) {
                    console.log('Error de duplicado de Mongo');
                    Swal.fire({
                        type: 'error',
                        title: 'Hubo un erro :(',
                        text: 'El cliente ya está registrado'
                    });
                } else {
                    console.log(res); 
                    Swal.fire(
                        'Se agregó el Cliente',
                        `${res.data.mensaje}`,
                        'success'
                    );  
                }
                // redireccionar
                history.push('/');

            });
    }
    

    const validarCliente = () => {
        const { nombre, apellido, empresa, email, telefono } = cliente;

        // revisar que las propiedades del state tengan contenido 
        let valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;

        return valido;
    }

  
    return(
        <React.Fragment>
            <h2>Nuevo Cliente</h2>
            <form onSubmit={agregarCliente}  className="animated fadeIn" >
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Nombre:</label>
                    <input
                         type="text" 
                         placeholder="Nombre Cliente" 
                         name="nombre" 
                         onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input 
                        type="text" 
                        placeholder="Apellido Cliente" 
                        name="apellido"
                        onChange={actualizarState}
                     />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input 
                        type="text"
                         placeholder="Empresa Cliente" 
                         name="empresa" 
                         onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input
                         type="email" 
                         placeholder="Email Cliente" 
                         name="email" 
                         onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Telefono:</label>
                    <input type="number" 
                        placeholder="Telefono Cliente" 
                        name="telefono" 
                        onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                    <input type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Cliente" 
                        disabled={validarCliente ()}
                    />
                </div>

            </form>
        </React.Fragment>
    )   
}

export default withRouter(NuevoCliente);