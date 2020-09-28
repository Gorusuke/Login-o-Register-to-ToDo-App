import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    // Obtener el state del formulario(ProyectoContext)
    const proyectosContext = useContext(proyectoContext);
    const {formulario, mostrarFormulario, agregarProyecto, mostrarError, errorFormulario} = proyectosContext;


    // State para el proyecto
    const [proyecto, setProyecto] = useState({
        nombre: ''
    });

    // Leer contenidos del input
    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    // Enviar el proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();

        // Validar
        if(proyecto.nombre === ''){
            mostrarError();
            return;
        }
        
        // Agregar al State
        agregarProyecto(proyecto)

        // Reiniciar el formulario
        setProyecto({
            nombre: ''
        })

    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn1"
                onClick={mostrarFormulario}
            >Nuevo Proyecto</button>
            {formulario
            ?   <form 
                    className="formulario-nuevo-proyecto"
                    onSubmit={onSubmitProyecto}
                >
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Proyecto"
                        name="nombre"
                        value={proyecto.nombre}
                        onChange={onChangeProyecto}
                    />
                    <input
                        type="submit"
                        className="btn1"
                        value="Agregar Proyecto"
                    />            
                </form>
            : null
            }
            {errorFormulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}
        </Fragment>
    );
}
 
export default NuevoProyecto;