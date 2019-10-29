import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axiosConfig';

function Login() {
 
    const [credenciales, guardarCredenciales] = useState({});

    // iniciar sesion en el servidor
    const loguear = async e => {
        e.preventDefault();

        // autenticar el usuario

        try {
            const respuesta = await clienteAxios.post('/login', credenciales);
            console.log(respuesta.data);
        } catch (error) {
            console.log(error);
            Swal.fire({
                type:'Error',
                title:'Hubo un error',
                text: error.response.data.mensaje
            })
        }
    }

    const leerDatos = e => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name] : e.target.value
        })
    }

    return(
        <div className="login">
            <h2>Iniciar Sesión</h2>
            <div className="contenedor-formulario">
                <form onSubmit={loguear}>
                    <div className="campo">
                        <label>Email</label>
                        <input type="email"
                            required
                            placeholder="Email para iniciar sesión"
                            onChange={leerDatos}
                        />
                    </div>

                    <div className="campo">
                        <label>Password</label>
                        <input type="password" placeholder="Password" 
                            required
                            onChange={leerDatos}
                        />
                    </div>
                    <input type="submit" value="Iniciar Sesion" className="btn btn-verde btn-block" />
                </form>
            </div>
        </div>
    )
}

export default Login;