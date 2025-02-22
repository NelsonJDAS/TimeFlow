import { MdOutlineFileDownload } from "react-icons/md";
import { useEffect, useRef, useState } from "react"
import pdfToText from 'react-pdftotext';


const ContenedorArchivo = () => {
    const [userLoad, setUserLoad] = useState(false);
    const [archivo, setArchivo] = useState("");

    const archivoRef = useRef("");

    const handleArchivo = (event) => {
        const file = event.target.files[0];
        if (file) {
          pdfToText(file)
            .then((extractedText) => {
              setArchivo(extractedText);
            })
            .catch((error) => {
              console.error('Error al extraer el texto del PDF:', error);
            });
        }
      };


    
    useEffect(() => {
        setUserLoad(true)
    }, [])

    // archivoRef.current.click()
    return (
        <>
            <button onClick={() => {
                console.log(archivo)
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
