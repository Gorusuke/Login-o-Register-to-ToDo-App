import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';


const Login = (props) => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    // Extraer los valores del context
    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, iniciarSesion} = authContext;

    // En caso de que el password o usuario no exista 
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
            // console.info(mensaje.msg, mensaje.categoria)
            return;
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history])

    // State para iniciar sesion
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    })

    // Destructuring a usuario
    const {email, password} = usuario;

    const login = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    // Submit (iniciar sesion)
    const onSubmit = (e) => {
        e.preventDefault();
        
        // Validar
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        // Pasarlo al Action
        iniciarSesion({
            email,
            password
        });
    }

    return (
        <div className="contenedor-usuario">
            <div className="contenedor-formulario sombra-dark">
                {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
                <h1>Login</h1>
                <form onSubmit={onSubmit}>
                    <div className="campo-formulario">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            placeholder="Email@email.com"
                            name="email"
                            value={email}
                            onChange={login}
                        />
                    </div>
                    <div className="campo-formulario">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            placeholder="Your Password"
                            name="password"
                            value={password}
                            onChange={login}
                        />
                    </div>
                    <div className="campo-formulario">
                        <input
                            type="submit"
                            className="btn1"
                            value="Login"
                        />
                    </div>
                </form>
                <div className="count">
                    <p>Don't have an Account?</p>
                    <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}
 
export default Login;