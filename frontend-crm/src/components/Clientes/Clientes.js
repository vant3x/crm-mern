import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import clienteAxios from '../../config/axiosConfig';

// componentes
import Cliente from './Cliente';
import Spinner from './../Layout/Spinner';

function Clientes () {
    // state  con hooks 
    const [clientes , guardarClientes] = useState([]);
    

    const fetchApi =  async () => {
       const clientesData = await clienteAxios.get('/clientes');

       // colocar el resultado en el state
       setTimeout( () => {
            guardarClientes(clientesData.data);
        }, 400);
    }

    useEffect( () => {
        fetchApi();
    }, [clientes] );
           
       // spinner de carga
       if (!clientes.length) return <Spinner />

    return (
       <React.Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Clientes</title>
            </Helmet>
            <h2>Clientes </h2>

            <Link 
                to={"/clientes/nuevo"} 
                className="btn btn-verde nvo-cliente">
                    <i className="fas fa-plus-circle"></i> Nuevo Cliente
            </Link>

            <ul className="listado-clientes">
                {clientes.map(cliente => (
                  <Cliente 
                    cliente={cliente} 
                 />
                ))}
            </ul>
       </React.Fragment>
    );
}

export default Clientes;