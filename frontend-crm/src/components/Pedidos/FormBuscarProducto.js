import React from 'react';

function FormBuscarProducto(props) {
    return(
        <form className="" onSubmit={props.buscarProducto}>
            <legend>{/*<i className="fas fa-search"></i>*/} Busca un Producto y agrega una cantidad </legend>
            <div className="campo">
                <label>Productos:</label>
                <input type="text" className="search-box"
                     placeholder="Nombre Productos" name="productos"
                     onChange={props.leerDatosBusqueda}  
                 />
            </div>

            <button type="submit" className="btn btn-azul btn-block"><i className="fas fa-search"></i> Buscar</button>
        </form>
    )
}

export default FormBuscarProducto;