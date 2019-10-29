import React, {useState, useEffect, Fragment } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axiosConfig';
import { withRouter } from 'react-router-dom';
import Spinner from './../Layout/Spinner';

function EditarProducto (props) {

    const { id } = props.match.params;

    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    });

    const [archivo, guardarArchivo] = useState('');

    useEffect(() => {

        const fetchAPI = async () => {
            const productoConsulta = await clienteAxios.get(`/productos/${id}`);
            guardarProducto(productoConsulta.data);
        }

        fetchAPI();
    }, []); 

    const actualizarProducto = async (e) => {
        e.preventDefault();
           const formData = new FormData();
           formData.append('nombre', producto.nombre);
           formData.append('precio', producto.precio);
           formData.append('imagen', archivo);
   
           // almacenar en la BD
           try {
               const res = await clienteAxios.put(`/productos/${id}`, formData, {
                   headers: {
                       'Content-Type':'multipart/form-data'
                   }
               });
   
               if (res.status === 200) {
                   Swal.fire(
                       'Producto Actualizado',
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
                   text: 'Vuelva a intentarlo, el producto no se actualizó'
               })
           }
    }

    // leer data form
    const infoProducto = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        });
    }

    // colocar la imagen en el state
    const leerArchivo = e => {
        guardarArchivo( e.target.files[0] );
    }

    // extraer los valores del state
    const {nombre, precio, imagen} = producto;

    if (!nombre && !precio) {
        return <Spinner />
    }

    return (
        <Fragment>
        <h2>Editar Producto</h2>
        <form onSubmit={actualizarProducto}  className="animated fadeIn">
            <legend>Llena todos los campos por favor</legend>
            <div className="campo">
                <label>Nombre:</label>
                <input type="text"
                     name="nombre" 
                    placeholder="Nombre del Producto" 
                    defaultValue={nombre}
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
                    defaultValue={precio}
                    onChange={infoProducto}
                />
            </div>

            <div className="campo">
                <label>Imagen: </label>
                { imagen ? (
                    <img width="200" src={`http://localhost:5000/${imagen}`} alt="imagen" />
                ) : null }
                <input 
                    type="file" 
                    name="imagen" 
                    onChange={leerArchivo}
                />
            </div>

            <div className="enviar">
                <input type="submit" className="btn btn-azul" value="Actualizar Producto"/>
            </div>
        </form>
   </Fragment>
    )
}

export default EditarProducto;