import React, { useEffect, useState } from 'react'
import { useStore } from "../Store/store";
import { TbClockHour8 } from "react-icons/tb";
import { FaBed } from "react-icons/fa";
import { IoIosAirplane } from "react-icons/io";

export default function CalendarioUsuario({ nombre }) {
    const { usuarios, usuariosStats } = useStore();
    const [user, setUser] = useState("");
    const [statsUser, setStatsUser] = useState("");
    const [turnoPartido, setTurnoPartido] = useState("");
    const [userLoad, setUserLoad] = useState(false)

    console.log(usuarios)

    useEffect(() => {
        if (usuariosStats.length > 0) {
            let turnoPartido = 0
            Object.entries(usuarios.usuarios).filter((elem) => {
                if (elem[0].toUpperCase() == nombre) {
                    for (let i = 0; i < elem[1].partido.length; i++) {
                        if (/\d/.test(elem[1].partido[i][0])) {
                            console.log(elem[1].partido[i][1], elem[1].partido[i][0])
                            turnoPartido = turnoPartido + (elem[1].partido[i][1] - elem[1].partido[i][0])
                        }
                        console.log(turnoPartido)
                        setTurnoPartido(turnoPartido)
                    }
                    setUser(elem[1])
                }

            })
            usuariosStats.filter((elem) => {
                elem.nombre.toUpperCase() == nombre && setStatsUser(elem)
            })
        }
    }, [nombre])
    useEffect(() => {
        setUserLoad(true)
    }, [])
    return (
        user != "" && usuarios != "" &&
        <div className='bg-secondary px-2 py-1 rounded-3 mt-3 bg-opacity-25 calendario mb-3'>
            <div className="row">
                <div className="col-12"><p className='text-center fw-bold fw-bold nombre-usuario-calendario'>{statsUser.nombre.toUpperCase()}</p></div>
            </div>
            <div className="row mt-1 mx-0">

                <div className="col-4 px-2"><div className="d-flex fw-bold bg-info rounded-3 bg-opacity-25 justify-content-around border-info border-1"><i className="p-1"><TbClockHour8 /></i> <p className='estadistica-usuario'>{statsUser.horas}</p></div></div>
                <div className="col-4 px-2"><div className="d-flex fw-bold bg-info rounded-3 bg-opacity-25 justify-content-around border-info border-1"><i className="p-1"><FaBed /></i> <p className='estadistica-usuario'>{statsUser.dias_libres}</p></div></div>
                <div className="col-4 px-2"><div className="d-flex fw-bold bg-info rounded-3 bg-opacity-25 justify-content-around border-info border-1"><i className="p-1"><IoIosAirplane /></i> <p className='estadistica-usuario'>{statsUser.vacaciones}</p></div></div>
            </div>
            <div className='mt-3 mx-1'>
                <div className="d-flex">
                    {usuarios.dias.slice(0, 14).map((elem) => {
                        return <span className='fecha-calendario mx-1 text-center text-info fw-bold'>{elem}</span>
                    })}
                </div>
                <div className="d-flex mt-1">
                    {user.horas.slice(0, 14).map((elem) => {
                        if (/\d/.test(elem)) {
                            return <span className='mx-1 calendario-valor text-center text-black fw-bold'>{elem[1] - elem[0]}</span>
                        } else {
                            return <span className='mx-1 calendario-valor text-center text-black fw-bold'>{elem[0].slice(0, 1)}</span>
                        }

                    })}
                </div>
                <div className="d-flex mt-2">
                    {usuarios.dias.slice(14, 28).map((elem) => {

                        return <span className='fecha-calendario mx-1 text-center text-info fw-bold'>{elem}</span>
                    })}
                </div>
                <div className="d-flex mt-1">
                    {user.horas.slice(14, 28).map((elem) => {
                        if (/\d/.test(elem)) {
                            return <span className='mx-1 calendario-valor text-center text-black fw-bold'>{elem[1] - elem[0]}</span>
                        } else {
                            return <span className='mx-1 calendario-valor text-center text-black fw-bold'>{elem[0].slice(0, 1)}</span>
                        }

                    })}
                </div>
                {usuarios.dias.length > 28 &&
                        <>
                            <div className="d-flex mt-2">
                                {usuarios.dias.slice(28, usuarios.dias.length).map((elem) => {

                                    return <span className='fecha-calendario mx-1 text-center text-info fw-bold'>{elem}</span>
                                })}
                            </div>
                            <div className="d-flex mt-1">
                                {user.horas.slice(28, usuarios.dias.length).map((elem) => {
                                    if (/\d/.test(elem)) {
                                        return <span className='mx-1 calendario-valor text-center text-black fw-bold'>{elem[1] - elem[0]}</span>
                                    } else {
                                        return <span className='mx-1 calendario-valor text-center text-black fw-bold'>{elem[0].slice(0, 1)}</span>
                                    }

                                })}
                            </div>
                        </>
                    }
                <div className="row mx-0">
                    <div className="col-12">
                        <p className='text-center fw-bold text-info'>Horas Turno Partidos - {turnoPartido}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
