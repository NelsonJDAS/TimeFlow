import React, { useEffect, useState } from 'react'
import { useStore } from "../Store/store";
import { TbClockHour8 } from "react-icons/tb";
import { FaBed } from "react-icons/fa";
import { IoIosAirplane } from "react-icons/io";

export default function CalendarioUsuario({ nombre }) {
    console.log(nombre)
    const { usuarios, usuariosStats } = useStore();
    const [user, setUser] = useState("");
    const [statsUser, setStatsUser] = useState("");
    const [turnoPartido, setTurnoPartido] = useState("");
    const [userLoad, setUserLoad] = useState(false)

    useEffect(() => {
        if (usuariosStats.length > 0) {
            let turnoPartido = 0
            Object.entries(usuarios.usuarios).filter((elem) => {
                if (elem[0].toUpperCase() == nombre) {
                    for (let i = 0; i < elem[1].partido.length; i++) {
                        if (!/\d/.test(elem[1].partido.length[i])) {
                            turnoPartido = turnoPartido + (elem[1].partido[i][1] - elem[1].partido[i][0])
                        }
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
        user != "" &&
            <div>
                <div className="row mt-3 mx-0">
                    <div className="col-3"><p className='text-center fw-bold fw-bold mr-1 nombre-usuario-calendario'>{statsUser.nombre.toUpperCase()}</p></div>
                    <div className="col-3 px-2"><div className="d-flex fw-bold bg-info rounded-3 bg-opacity-25 justify-content-around px-1"><i className='pt-1'><TbClockHour8 /></i> <p>{statsUser.horas}</p></div></div>
                    <div className="col-3 px-2"><div className="d-flex fw-bold bg-info rounded-3 bg-opacity-25 justify-content-around"><i className='pt-1'><FaBed /></i> <p>{statsUser.dias_libres}</p></div></div>
                    <div className="col-3 px-2"><div className="d-flex fw-bold bg-info rounded-3 bg-opacity-25 justify-content-around"><i className='pt-1'><IoIosAirplane /></i> <p>{statsUser.vacaciones}</p></div></div>
                </div>
                <div className='mt-3 mx-1'>
                    <div className="d-flex justify-content-between">
                        {usuarios.dias.slice(0, 14).map((elem) => {
                            return <span className='fecha-calendario mx-1 text-center fw-bold'>{elem}</span>
                        })}
                    </div>
                    <div className="d-flex mt-1">
                        {user.horas.slice(0, 14).map((elem) => {
                            if (/\d/.test(elem)) {
                                return <span className='mx-1 calendario-valor text-center'>{elem[1] - elem[0]}</span>
                            } else {
                                return <span className='mx-1 calendario-valor text-center'>{elem[0].slice(0, 1)}</span>
                            }

                        })}
                    </div>
                    <div className="d-flex mt-2 justify-content-between">
                        {usuarios.dias.slice(14, 28).map((elem) => {

                            return <span className='fecha-calendario mx-1 text-center fw-bold'>{elem}</span>
                        })}
                    </div>
                    <div className="d-flex mt-1 justify-content-between">
                        {user.horas.slice(14, 28).map((elem) => {
                            if (/\d/.test(elem)) {
                                return <span className='mx-1 calendario-valor text-center'>{elem[1] - elem[0]}</span>
                            } else {
                                return <span className='mx-1 calendario-valor text-center'>{elem[0].slice(0, 1)}</span>
                            }

                        })}
                    </div>
                    <div className="row mx-0">
                        <div className="col-12">
                            <p className='text-center fw-bold text-info'>Horas Turno Partidos - {turnoPartido}</p>
                        </div>
                    </div>

                </div>
            </div>
    )
}
