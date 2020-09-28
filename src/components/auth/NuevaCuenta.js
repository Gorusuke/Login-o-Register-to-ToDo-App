import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';


const NuevaCuenta = (props) => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    // Extraer los valores del context
    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, registrarUsuario} = authContext;

    // En caso de que el usuario se haya autenticado o reguistrado o sea un registro duplicado
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
            return;
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history])

    // State para iniciar sesion
    const [nuevousuario, setNuevoUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        comfirm: ''
    })

    // Destructuring a usuario
    const {nombre, email, password, comfirm} = nuevousuario;

    const iniciarSesion = (e) => {
        setNuevoUsuario({
            ...nuevousuario,
            [e.target.name] : e.target.value
        })
    }

    // Submit (iniciar sesion)
    const onSubmit = (e) => {
        e.preventDefault();
        
        // Validar
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || comfirm.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return;
        }

        // Validar que el password minimo 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password debe ser minimo 6 caracteres', 'alerta-error')
            return;
        }

        // Validar que los password sean iguales
        if(password !== comfirm){
            mostrarAlerta('Los password deben ser iguales', 'alerta-error')
            return;
        }

        // Pasarlo al Action
        registrarUsuario({
            nombre,
            email,
            password
        });
    }

    return (
        <div className="contenedor-usuario">
            <div className="contenedor-formulario sombra-dark">
                {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
                <h1>Create Account</h1>
                <form onSubmit={onSubmit}>
                    <div className="campo-formulario">
                        <label htmlFor="nombre">Name</label>
                        <input 
                            type="text"
                            id="nombre"
                            placeholder="Your Name"
                            name="nombre"
                            value={nombre}
                            onChange={iniciarSesion}
                        />
                    </div>
                    <div className="campo-formulario">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            placeholder="Email@email.com"
                            name="email"
                            value={email}
                            onChange={iniciarSesion}
                        />
                    </div>
                    <div className="campo-formulario">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            placeholder="New Password"
                            name="password"
                            value={password}
                            onChange={iniciarSesion}
                        />
                    </div>
                    <div className="campo-formulario">
                        <label htmlFor="comfirm">Confirm Password</label>
                        <input 
                            type="password"
                            id="comfirm"
                            placeholder="Rewrite Your Password"
                            name="comfirm"
                            value={comfirm}
                            onChange={iniciarSesion}
                        />
                    </div>
                    <div className="campo-formulario">
                        <input
                            type="submit"
                            className="btn1"
                            value="Register"
                        />
                    </div>
                </form>
                <div className="count">
                    <p>Already have the account?</p>
                    <Link to={'/'} className="enlace-cuenta">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
 
export default NuevaCuenta;