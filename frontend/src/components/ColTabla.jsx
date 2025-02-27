import React from 'react'

const ColTabla = ({nombre, horas, descanso, vacaciones}) => {
  return (
    <>
        <div className="col-3 align-content-center"><p className='nombre-usuario'>{nombre.toUpperCase()}</p></div>
        <div className="col-3 align-content-center"><p className='text-center bg-info fw-bold text-white rounded-3 mt-2 mx- bg-opacity-50'>{horas}</p></div>
        <div className="col-3 align-content-center"><p className='text-center bg-warning text-warning fw-bold rounded-3 mt-2 mx- bg-opacity-25'>{descanso}</p></div>
        <div className="col-3 align-content-center"><p className='text-center bg-success fw-bold text-white rounded-3 mt-2 mx- bg-opacity-50'>{vacaciones}</p></div>
    </>
  )
}

export default ColTabla
