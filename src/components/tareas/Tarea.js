import React, {useContext} from 'react';
import TareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';


const Tarea = ({tarea}) => {
    
    // Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    // Obtener las Tareas del proyecto
    const tareasContext = useContext(TareaContext);
    const {eliminarTarea, obtenerTareas, actualizarTarea, editarTareaActual} = tareasContext;

    // Array destructuring
    const [proyectoActual] = proyecto;

    // Funcion que se ejecuta cuando presionan el boton de eliminar
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual.id)
    }

    // Funcion que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        if(tarea.estado){
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    }

    // Funcion que edita las tareas
    const editarTarea = tarea => {
        editarTareaActual(tarea);
    }

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado
                ?   (<button 
                        type="button" 
                        className="completo"
                        onClick={() => cambiarEstado(tarea)}
                        >Completo</button>
                    )
                :   (<button 
                        type="button" 
                        className="incompleto"
                        onClick={() => cambiarEstado(tarea)}
                        >Incompleto</button>
                    )
                }
                <button 
                    type="button" 
                    className="btn3"
                    onClick={() => editarTarea(tarea)}
                >Editar</button>

                <button 
                    type="button" 
                    className="btn4"
                    onClick={() => tareaEliminar(tarea._id)}
                >Eliminar</button>                
            </div>            
        </li>
    );
}

export default Tarea;