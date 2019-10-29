import React, {useState, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axiosConfig';
import { withRouter } from 'react-router-dom';

function NuevoProducto (props) {

    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    });
    
    const [archivo, guardarArchivo] = useState('');

    const agregarProducto = async e => {
        e.preventDefault();

        // crear un formdata
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        // almacenar en la BD
        try {
            const res = await clienteAxios.post('/productos/', formData, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            });

            if (res.status === 200) {
                Swal.fire(
                    'Producto Agregado',
                    res.data.mensaje,   
                    'success'
                )
            }

            // redireccionar
            props.history.push('/productos');

            
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo, el producto no se agregó'
            })
        }
    }

    // leer data form
    const infoProducto = e => {
        guardarProducto({
            // obtener una copia del state
            ...producto,
            [e.target.name] : e.target.value
        });
    }

    // colocar la imagen en el state
    const leerArchivo = e => {
        guardarArchivo( e.target.files[0] );
    }

  

    return (
       <Fragment>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Nuevo Producto</title>
            </Helmet>
            <h2>Nuevo Producto</h2>
            <form onSubmit={agregarProducto}  className="animated fadeIn">
                <legend>Llena todos los campos por favor</legend>
                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text"
                         name="nombre" 
                        placeholder="Nombre del Producto" 
                        onChange={infoProducto}
                    />
                </div>

                <div className="campo">
                    <label>Precio: </label>
                    <input type="number"
                        name="precio"
                        placeholder="Precio"
                        min="0.00" 
                        step="0.01"  
                        onChange={infoProducto}
                    />
                </div>

                <div className="campo">
                    <label>Imagen: </label>
                    <input 
                        type="file" 
                        name="imagen" 
                        onChange={leerArchivo}
                    />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Producto"/>
                </div>
            </form>
       </Fragment>
    )
}

export default withRouter(NuevoProducto);