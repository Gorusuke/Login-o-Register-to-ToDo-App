import React, {useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';



const Proyecto = ({proyecto}) => {

    // Obtener el state del formulario(ProyectoContext)
    const proyectosContext = useContext(proyectoContext);
    const {proyectoActual} = proyectosContext;

    // Obtener el context de Tarea(TareaContext)
    const tareasContext = useContext(TareaContext);
    const {obtenerTareas} = tareasContext;

    // Funcion para agragar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id); // Fijar el proyecto actual
        obtenerTareas(id); // Filtrar las tareas al dar click
    }
    
    return (
        <li>
            <button
                type="button"
                className="btn2"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
    );
}
 
export default Proyecto;