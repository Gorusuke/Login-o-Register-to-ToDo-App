import React, {Fragment, useContext} from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';


const ListadoTarea = () => {

    // Obtener el state del formulario(ProyectoContext)
    const proyectosContext = useContext(proyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContext;

    // Obtener las Tareas del proyecto
    const tareasContext = useContext(TareaContext);
    const {tareasProyecto} = tareasContext;

    // Si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona Un Proyecto</h2>

    // Array destructuring
    const [proyectoActual] = proyecto;
    
    return(
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasProyecto.length === 0 
                    ?(<li className="tarea"> <p>No hay Tareas</p></li>)
                    : (tareasProyecto.map(tarea => (
                        <Tarea
                            key={tarea._id}
                            tarea={tarea}
                        />
                    )))
                }
                <button
                    type="button"
                    className="btn1"
                    onClick={() => eliminarProyecto(proyectoActual._id)}
                >Eliminar Proyecto &times;</button>
            </ul>
        </Fragment>
    );
}
 
export default ListadoTarea;