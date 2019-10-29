import React from 'react';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Helmet} from "react-helmet";

/* Componentes Layout */
import Header from './components/Layout/Header';
import Navegacion from './components/Layout/Navegacion';

/* Componentes */
import Clientes from './components/Clientes/Clientes';
import NuevoCliente from './components/Clientes/NuevoCliente';
import EditarCliente from './components/Clientes/EditarCliente';

import Productos from './components/Productos/Productos';
import NuevoProducto from './components/Productos/NuevoProducto';
import EditarProducto from './components/Productos/EditarProductos';


import Pedidos from './components/Pedidos/Pedidos';
import NuevoPedido from './components/Pedidos/NuevoPedido';

// sign up y login
import Login from './components/auth/Login';

function App () {
  return (
    <Router>
      <React.Fragment>
        <Header />
        <div className="grid contenedor contenido-principal">
          <Navegacion />
          <main className="caja-contenido col-9">
            {/* TODO: Routing a los componentes*/}
            <Switch>
                <Route exact path="/" component={Clientes} />
                <Route exact path="/clientes" component={Clientes} />
                <Route exact path="/clientes/nuevo" component={NuevoCliente} />
                <Route exact path="/clientes/editar/:id" component={EditarCliente} />

                <Route exact path="/productos" component={Productos} />
                <Route exact path="/productos/nuevo" component={NuevoProducto } />
                <Route exact path="/productos/editar/:id" component={EditarProducto } />

                <Route exact path="/pedidos" component={Pedidos} />
                <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />

                <Route exact path="/login" component={Login} />
            </Switch>
          </main>
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;

