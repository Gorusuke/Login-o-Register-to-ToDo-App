import {TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, 
ELIMINAR_TAREA, EDITAR_TAREA, ACTUALIZAR_TAREA, LIMPIAR_TAREA} from '../../types';


export default (state, action) => {
    switch(action.type){
        case TAREAS_PROYECTO:
            return{
                ...state,
                tareasProyecto: action.payload
            }
        case AGREGAR_TAREA:
            return{
                ...state,
                // tareas: [...state.tareas, action.payload], --> de esta manera la animacion se pone de ultimo cuando agregamos las tareas 
                tareasProyecto: [action.payload, ...state.tareasProyecto], // --> de esta manera la animacion se pone de primero cuando agregamos las tareas 
                errorTarea: false
            }
        case VALIDAR_TAREA:
            return{
                ...state,
                errorTarea: true
            }
        case ELIMINAR_TAREA:
            return{
                ...state,
                tareasProyecto: state.tareasProyecto.filter(tarea => tarea._id !== action.payload)  
            }
        case ACTUALIZAR_TAREA:
            return{
                ...state,
                tareasProyecto: state.tareasProyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea) 
            }
        case EDITAR_TAREA:
            return{
                ...state,
                tareaSeleccionada: action.payload
            }
        
        case LIMPIAR_TAREA:
        return{
            ...state,
            tareaSeleccionada: null
        }           
        default:
            return state;
    }
}