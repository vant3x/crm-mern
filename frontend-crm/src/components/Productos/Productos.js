import React, { useEffect, useState, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import clienteAxios from '../../config/axiosConfig';

// componentes
import Producto from './Producto';
import Spinner from './../Layout/Spinner';

function Productos () {

    const [productos, guardarProductos] = useState([]);

    const fetchAPI = async () => {
        const productosConsulta = await clienteAxios.get('/productos');
        //console.log(productosConsulta);
       setTimeout( () => {
        guardarProductos(productosConsulta.data);
       }, 400);
    }

    useEffect( () => {
        fetchAPI();
    }, [productos]);    

    // spinner de carga
    if (!productos.length) return <Spinner />

    return (
        <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Productos</title>
            </Helmet>
            <h2>Productos</h2>
            <Link 
                to={"/productos/nuevo"} 
                className="btn btn-verde nvo-producto">
                    <i className="fas fa-plus-circle"></i> Nuevo Producto
            </Link>

            <ul className="listado-productos">
              {productos.map(producto => (
                  <Producto producto={producto} key={producto._id} />
              ))}
            </ul>

        </Fragment>
    );
}

export default Productos;