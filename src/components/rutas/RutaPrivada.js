import React, {useContext, useEffect} from 'react';
import  { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';


const RutaPrivada = ({component: Component, ...props}) => {

    // Extraer los valores del context
    const authContext = useContext(AuthContext);
    const {autenticado, usuarioAutenticado, cargando} = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);
    
    return (
        <Route {...props} render={ props => !autenticado && !cargando ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        ) } />
    );
}
 
export default RutaPrivada;