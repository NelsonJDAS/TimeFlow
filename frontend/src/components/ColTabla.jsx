import React from 'react'

const ColTabla = ({nombre, horas, descanso, vacaciones}) => {
  return (
    <>
        <div className="col-3 text-center">{nombre}</div>
        <div className="col-3 text-center">{horas}</div>
        <div className="col-3 text-center">{descanso}</div>
        <div className="col-3 text-center">{vacaciones}</div>
    </>
  )
}

export default ColTabla
