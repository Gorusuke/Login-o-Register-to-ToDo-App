import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';




const FormTarea = () => {

    // Obtener el state si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    // Obtener las Tareas del proyecto
    const tareasContext = useContext(TareaContext);
    const {agregarTarea, validarTarea, errorTarea, obtenerTareas, tareaSeleccionada, actualizarTarea, limpiarTarea} = tareasContext;

    // Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaSeleccionada !== null){
            setTarea(tareaSeleccionada)
        } else {
            setTarea({
                nombre: ''
            })
        }
    }, [tareaSeleccionada])

    const [tarea, setTarea] = useState({
        nombre: ''
    })

    // Si no hay proyecto seleccionado
    if(!proyecto) return null;

    // Array destructuring
    const [proyectoActual] = proyecto;

    // Leer los valores del formulario
    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    // 
    const tareaAgregada = (e) => {
        e.preventDefault();

        // Validar
        if(tarea.nombre.trim() === ''){
            validarTarea();
            return;
        }

        // Revisa si es edicion o si es nueva tarea
        if(tareaSeleccionada === null){
            // Agregar la tarea
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            // Actualiza la tarea existente
            actualizarTarea(tarea);

            // Elimina tareaSeleccionada del State
            limpiarTarea();
        }

        // Pasar la Validacion ↓↓↓↓↓↓↓↓↓
        // ver en tareaReducer Line:16        

        // Obtener y filtrar las tareas del proyectoActual
        obtenerTareas(proyectoActual.id);

        // Reiniciar el form
        setTarea({
            nombre: ''
        })
    }


    return (
        <div className="formulario">
            <form
                onSubmit={tareaAgregada}
            >
                {errorTarea ? <p className="error2">El nombre de la tarea es obligatorio</p> : null}

                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={tarea.nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn1"
                        value={tareaSeleccionada ? "Editar Tarea" : "Agregar Tarea"}
                    />
                </div>

            </form>
        </div>
    );
}
 
export default FormTarea;