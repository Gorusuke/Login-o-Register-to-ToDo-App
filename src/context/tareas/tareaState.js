import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios'

import {TAREAS_PROYECTO, AGREGAR_TAREA, 
VALIDAR_TAREA, ELIMINAR_TAREA, EDITAR_TAREA, ACTUALIZAR_TAREA,
LIMPIAR_TAREA} from '../../types';


const TareaState = props => {

    const initialState = {
        tareasProyecto: [],
        errorTarea : false,
        tareaSeleccionada: null
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    // Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
        const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}})
        dispatch({
            type: TAREAS_PROYECTO,
            payload: resultado.data.tareas
        })    
    }

    // Agregar una tarea al proyecto seleccionado
    const agregarTarea = async (tarea) => {
        await clienteAxios.post('/api/tareas', tarea);
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    // Validar el Formulario de Tarea
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    // Eliminar tarea por su id
    const eliminarTarea = async (id, proyecto) => {
        await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}})
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }

    // Actualiza la tarea modificada
    const actualizarTarea = async tarea => {
        const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: resultado.data.tareaExiste
        })
    }

    // Extrae una tarea para editarla
    const editarTareaActual = tarea => {
        dispatch({
            type: EDITAR_TAREA,
            payload: tarea
        })
    }    

    // Elimina la tareaSeleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return(
        <TareaContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                editarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;
