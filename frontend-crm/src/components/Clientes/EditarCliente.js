import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2'; 
import { withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axiosConfig';


function EditarCliente(props) {

    // obtener el ID
    const { id } = props.match.params;

    // cliente = state
    const [ cliente, datosCliente ] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    // Query a la API
    const fetchApi = async () => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
        
        // colocar en el state 
        datosCliente(clienteConsulta.data);
    }

    useEffect( () => {
        fetchApi();
    }, []);

    // leer los datos del formulario
    const actualizarState = e => {
        // almacenar lo que el usuario escribe en el state
        datosCliente({
            // copia estado actual
            ...cliente,
            [e.target.name] : e.target.value
        });
    }    
    
    // actualiza cliente
    const actualizarCliente = e => {
        e.preventDefault();

        // enviar petición axios
        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
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
                        'Correcto',
                        `Se actualizó el cliente Correctamente`,
                        'success'
                    );  
                }   
                // redireccionar
                setTimeout( () => {
                    props.history.push('/');
                }, 1500);
            })
    }
 

    const validarCliente = () => {
        const { nombre, apellido, empresa, email, telefono } = cliente;

        // revisar que las propiedades del state tengan contenido 
        let valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;

        return valido;
    }

  
    return(
        <Fragment>
            <h2>Editar Cliente</h2>
            <form onSubmit={actualizarCliente}  className="animated fadeIn">
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Nombre:</label>
                    <input
                         type="text" 
                         placeholder="Nombre Cliente" 
                         name="nombre" 
                         onChange={actualizarState}
                         defaultValue={cliente.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input 
                        type="text" 
                        placeholder="Apellido Cliente" 
                        name="apellido"
                        onChange={actualizarState}
                        defaultValue={cliente.apellido}
                     />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input 
                        type="text"
                         placeholder="Empresa Cliente" 
                         name="empresa" 
                         onChange={actualizarState}
                         defaultValue={cliente.empresa}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input
                         type="email" 
                         placeholder="Email Cliente" 
                         name="email" 
                         onChange={actualizarState}
                         defaultValue={cliente.email}
                    />
                </div>

                <div className="campo">
                    <label>Telefono:</label>
                    <input type="number" 
                        placeholder="Telefono Cliente" 
                        name="telefono" 
                        onChange={actualizarState}
                        defaultValue={cliente.telefono}
                    />
                </div>

                <div className="enviar">
                    <input type="submit" 
                        className="btn btn-azul" 
                        value="Guardar Cambios" 
                        disabled={validarCliente ()}
                    />
                </div>

            </form>
        </Fragment>
    )   
}

export default withRouter(EditarCliente);