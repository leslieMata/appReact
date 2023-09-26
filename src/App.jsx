// funcion flecha

import { useEffect, useReducer, useState } from "react";
import { Footer } from "./components/Footer/Footer";
import { FormularioTareas } from "./components/FormularioTareas/FormularioTareas";
import { CardTarea } from "./components/TareaAnotadas/CardTarea";
import { Header } from "./components/header/Header";
import { tareaReducer } from "./reducers/TareaReducer";
import Swal from "sweetalert2";
// todo lo que empiece con use es un hook
// otra manera de exportar
export const App = () => {
    const init = () => {
        return JSON.parse(localStorage.getItem("tareas")) || []
       
    }
    const [state, dispatch] = useReducer(tareaReducer, [], init)

    const [descripcion, setDescripcion] = useState("")

    useEffect(() => {
      localStorage.setItem("tareas", JSON.stringify(state))
    }, [state])
    

    const handleInputChange =(evento) =>{
        setDescripcion(evento.target.value);
        console.log(descripcion);
    }
    const handleSubmit = (evento) => {
        evento.preventDefault();
        const tareaNueva={
            id: new Date().getTime(),
            descripcion: descripcion,
            realizado:false
        }
        const action = {
            type: "agregar",
            payload: tareaNueva
        }
        dispatch(action)
        Swal.fire({
            title: 'Tarea Agregada exitosamente!',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(/images/trees.png)',
            backdrop: `
              rgba(0,0,123,0.4)
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            `
          })
        setDescripcion("")
    }

     const handelCambiar= (id) =>{
        dispatch({
            type: "cambiar",
            payload: id
        })
     }
     const handleEliminar = (id) => {
        Swal.fire({
            title: 'Estas segur@ que quieres eliminar la Tarea?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminada Existosamente!',
                'Your file has been deleted.',
                'success'
              )
              dispatch({
                type: "borrar",
                payload: id
            })
            } else if(result.isDenied) {

            }
          })
     }
     let terminadas = 0;
     for (let i = 0; i < state.length; i++) {
        if (state[i].realizado === true) {
            terminadas++;
        }
     }

     let porcentaje = 0;
     if (state.length>0) {
        porcentaje = terminadas / state.length;
     }

    // const tareas =["estudiar React", "hacer tareas", "comer", "hacer ejercicio", "tomar agua"]
    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <FormularioTareas descripcion={descripcion} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="d-flex flex-wrap">
                            {
                                 state.map((tarea, index) => {
                                    return(
                                        <div key={index} className="p-2">
                                            <CardTarea key={index} handelCambiar={handelCambiar} handleEliminar={handleEliminar} tarea={tarea} index={index}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer porcentaje={porcentaje} />
        </>
    )
}

export default App;
// otro tipo de funcion flecha
// const App = () => <h1>hola mundo desde React</h1>
