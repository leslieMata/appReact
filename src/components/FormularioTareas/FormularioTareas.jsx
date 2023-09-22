export const FormularioTareas = ({descripcion, handleInputChange, handleSubmit}) => {
    
  return (
   <>
    
    <hr />
    <div className="card" style={{ width: "100%" }}>
        <div className="card-body">
        <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
            <h3>Agregar Tarea</h3>
                <label htmlFor="tareaInput" className="form-label mt-4">Descripción</label>
                {/* los aria-describedby ayuda a personas con  discapacidad */}
                <input onChange={(e) => handleInputChange(e)} value={descripcion} type="text" className="form-control" id="tareaInput" aria-describedby="descripcionText" required/>
                <div id="descripcionText" className="form-text">Agrega la descripción de la tarea.</div>
                <button  type="submit" className="btn btn-success form-control mt-4">Agregar</button>
            </div>
        </form>
        </div>
    </div>
   </>
  )

}
