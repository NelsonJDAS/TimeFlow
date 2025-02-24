import { useEffect, useState } from "react";
import { useStore } from "../Store/store";
import ColTabla from "./ColTabla";

const ContenedorHoras = () => {
    const { usuarios, usuariosStats } = useStore();
    const [userLoad, setUserLoad] = useState(false);

    useEffect(() => {
        setUserLoad(true)
    }, [])
    return (
        <div className={`container p-4 contenedor-usuarios align-content-center ${userLoad ? "animacion-contenedor activa" : "animacion-contenedor"}`}>

            <p className={`text-center mt-5 fs-2 fw-bold ${usuariosStats.length != undefined && "d-none" }`}>Selecciona un Archivo</p>


            <div className={`row lista-usuarios ${usuariosStats.length != undefined ? "opacity-100" : "opacity-0"}`}>
                <div className="col-6 fw-bold text-center align-content-center">
                    <h2>Lista</h2>
                </div>
                <div className="col-6 text-end">
                    <select className="text-center border border-info text-secondary rounded-4 form-select form-select-sm" aria-label="Small select example">
                        <option key="User">Usuarios</option>
                        {usuariosStats.length > 0 && usuariosStats.map((user) => {
                            return <option key={user.nombre.toUpperCase()}>{user.nombre.toUpperCase()}</option>
                        })}
                    </select>
                </div>
                <div className="container mt-3">
                    <div className="row">
                        {usuariosStats.length > 0 && usuariosStats.map((user) => {
                            return <ColTabla key={user.nombre} nombre={user.nombre} vacaciones={user.vacaciones} descanso={user.dias_libres} horas={user.horas} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContenedorHoras
