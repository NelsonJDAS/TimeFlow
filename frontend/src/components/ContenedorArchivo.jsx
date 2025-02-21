import { MdOutlineFileDownload } from "react-icons/md";
import { useEffect, useState } from "react"

const ContenedorArchivo = () => {
    const [userLoad, setUserLoad] = useState(false);

    useEffect(() => {
        setUserLoad(true)
    }, [])

    return (
        <div className={`contenedor-archivo container w-80 mt-4 rounded-3 align-content-center ${userLoad ? "animacion-contenedor activa" : "animacion-contenedor"}`}>
            <i className="row icono-descarga text-secondary">  <MdOutlineFileDownload /></i>
            <p className="text-center text-secondary">Haz click para subir el archivo</p>
        </div>
    )
}

export default ContenedorArchivo
