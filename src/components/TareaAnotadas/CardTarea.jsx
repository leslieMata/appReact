import { useState } from "react"

export const CardTarea = ({tarea, index, handelCambiar, handleEliminar}) => {
  return (
  <>
    <div className={tarea.realizado ? "card bg-success" : "card bg-light"} style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h5 className="card-title">Tarea {index + 1}</h5>
          <p className="card-text">{tarea.descripcion}</p>
          <br/>
          <div className="d-grid gap-2">
            <button onClick= {() => handleEliminar(tarea.id)} className="btn btn-danger">Borrar</button>
            <button onClick={() => handelCambiar(tarea.id)} className="btn btn-primary">{tarea.realizado ? "Marcar como inconclusa." : "Marcar como terminada"} </button>
          </div>
        </div>
    </div>  
  </>
  )
}

