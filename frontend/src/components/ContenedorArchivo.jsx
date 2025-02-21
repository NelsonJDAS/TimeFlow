import { MdOutlineFileDownload } from "react-icons/md";
import { useEffect, useRef, useState } from "react"

const ContenedorArchivo = () => {
    const [userLoad, setUserLoad] = useState(false);
    const [archivo, setArchivo] = useState("");

    const archivoRef = useRef("");

    const handleArchivo = (e) => {
        setArchivo(e)
        console.log(e)
    }

    useEffect(() => {
        setUserLoad(true)
    }, [])

    // archivoRef.current.click()
    return (
        <>
            <button onClick={() => {
                console.log(archivo.target.files[0])
            }}>dasda</button>
            <div className={`contenedor-archivo container w-80 mt-4 rounded-3 align-content-center ${userLoad ? "animacion-contenedor activa" : "animacion-contenedor"}`} onClick={() => console.log("")}>
                <input type="file" accept=".pdf" className="" ref={archivoRef} onChange={handleArchivo} />
                <i className="row icono-descarga text-secondary">  <MdOutlineFileDownload /></i>
                <p className="text-center text-secondary">{archivo != "" ? "Archivo subido" : "Haz click para subir el archivo"}</p>
                {/* {archivo != "" && <p className="text-center text-secondary opacity-50 mt-1">{archivo.split("\\")[archivo.split("\\").length - 1]}</p>} */}
            </div>
        </>
    )
}

export default ContenedorArchivo
