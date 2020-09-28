import React, {useReducer} from 'react'
import alertaContext from './alertaContext';
import alertaReducer from './alertaReducer';
import {MOSTRAR_ALERTA, OCULTAR_ALERTA} from '../../types';

const AlertaState = props => {
    const initialState = {
        alerta: null
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(alertaReducer, initialState);

    // Funcion
    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });

        // Despues de 4s limpia la alerta previa ↑↑↑↑↑
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 4000);
    }
 
    return(
        <alertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )
}

export default AlertaState;