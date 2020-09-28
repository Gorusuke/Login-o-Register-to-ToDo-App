import React, {useContext, useEffect} from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';


const ListadoProyectos = () => {

    // Obtener el state del (ProyectoState)
    const proyectosContext = useContext(proyectoContext);
    const {proyectos, obtenerProyectos, mensaje} = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        // Si hay un error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        obtenerProyectos();
        // eslint-disable-next-line
    }, [ obtenerProyectos, mensaje ])
    
    // Revisar si proyectos tiene contenido
    if(proyectos.length === 0) return <p className="mensaje">No hay proyectos, crea uno para comenzar!</p>;

    return (
        <ul className="listado-proyectos">   
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>): null}
            {proyectos.map(proyecto => (   
                <Proyecto
                    key={proyecto._id}
                    proyecto={proyecto}
                />
            ))}
                     
        </ul>
    );
}
 
export default ListadoProyectos;