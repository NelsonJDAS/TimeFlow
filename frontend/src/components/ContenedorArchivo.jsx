import { MdOutlineFileDownload } from "react-icons/md";
import { useEffect, useRef, useState } from "react"
import pdfToText from 'react-pdftotext';


const ContenedorArchivo = () => {
    const [userLoad, setUserLoad] = useState(false);
    const [archivo, setArchivo] = useState("");

    const archivoRef = useRef("");

    function ConvertirHora(hora) {
        const [horas, minutos] = hora.split(':').map(Number);
        return horas + minutos / 60;
    }

    const handleArchivo = (event) => {
        const file = event.target.files[0];
        if (file) {
            pdfToText(file)
                .then((extractedText) => {
                    console.log(extractedText)
                    const textoFiltrado = extractedText.replace(/\b[lL]\b/g, "0_Libre")
                    .replace(/\b[vV]\b/g, "0_Vacaciones").replace(/(?<!:)\b\d+\b(?!:)/g, "")
                    
                    let dias = extractedText.match(/(?<!:)\b\d+\b(?!:)/g);

                    console.log(dias)
                    const textoDivido = textoFiltrado.split(/\s(?=[a-zA-Z])/);

                    console.log(textoDivido)
                    
                    const Usuarios = textoDivido.map((user) => {
                        if (/\d/.test(user)) {
                            let UserFiltrado = user.replace(/0_/g, "")

                            const [nombre, ...horas] = UserFiltrado.split(/\s+/)

                            let horasAEnteros = []
                            for (let i = 0; i < horas.length; i++) {
                                if (/\d/.test(horas[i])){
                                    horasAEnteros.push(ConvertirHora(horas[i]))
                                } else {
                                    horasAEnteros.push(horas[i])
                                }
                            } 
                            for (let i = 0; i < horasAEnteros.length; i += 2) {
                                horasAEnteros.push(horasAEnteros.slice(i, i + 2));
                            }


                                return {
                                    nombre : nombre,
                                    horas : horasAEnteros.slice(0, -1)
                                }
                            
                        }
                    })

                    setArchivo({
                        dias: dias,
                        Usuarios,
                    });
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
