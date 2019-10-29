import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navegacion = () => {
    const checkActive = (match, location) => {
        if(!location) return false;
        const {pathname} = location;
        console.log(pathname);
        return pathname === "/";
    }
    return (
        <aside className="sidebar col-3">   
            <h2>Administración</h2>
            <nav className="navegacion">
                <NavLink to={"/"} className="clientes" activeClassName="active-link" isActive={checkActive}> <i className="fas fa-users"></i> Clientes</NavLink>
                <NavLink to={"/productos"} className="productos" activeClassName="active-link"> <i className="fas fa-boxes"></i> Productos</NavLink>
                <NavLink to={"/pedidos"} className="pedidos" activeClassName="active-link"> <i className="fas fa-book"></i> Pedidos</NavLink>
            </nav>
        </aside>
    )
}

export default Navegacion;