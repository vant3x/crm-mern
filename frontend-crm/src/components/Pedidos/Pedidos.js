import React, { Fragment, useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import clienteAxios from '../../config/axiosConfig';

import DetallesPedido from './DetallesPedido';
import Spinner from './../Layout/Spinner';


function Pedidos () {

    const [pedidos, guardarPedidos] = useState([]);
  
    useEffect(() => {
        fetchAPI();
    }, [pedidos]); 

    const fetchAPI = async () => {
        // obtener los pedidos
        const resultado = await clienteAxios.get('/pedidos');
        guardarPedidos(resultado.data);
        console.log(resultado);
        console.log(resultado.data);
    }  

     // spinner de carga
     if (!pedidos.length) return <Spinner />

    

    return (
        <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Pedidos</title>
            </Helmet>
         <h2>Pedidos</h2>

         <ul className="listado-pedidos animated fadeIn">
            {pedidos.map(pedido => (
                <DetallesPedido 
                    key={pedido._id}
                    pedido={pedido}
                />
             ))}    
        </ul>

        </Fragment>
    );
}

export default Pedidos;