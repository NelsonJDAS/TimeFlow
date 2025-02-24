import { MdOutlineFileDownload } from "react-icons/md";
import { useEffect, useRef, useState } from "react"
import { useStore } from "../Store/store"
import pdfToText from 'react-pdftotext';


const ContenedorArchivo = () => {
    const [userLoad, setUserLoad] = useState(false);
    const [users, setUsers] = useState("");
    const [userStats, setUserStats] = useState("");
    const [fileName, setFileName] = useState("");
    const { usuarios, usuariosStats } = useStore();

    const AgregarUsuarios = useStore((state) => state.AgregarUsuarios)
    const AgregarUsuarioStats = useStore((state) => state.AgregarUsuarioStats)

    const archivoRef = useRef("");

    const ConvertirHora = (hora) => {
        const [horas, minutos] = hora.split(':').map(Number);
        return horas + minutos / 60;
    }
    const ExtraerStats = (Users) => {
        let UsersStats = Object.values(Users).map((user) => {
            let libre = 0
            let vacaciones = 0
            let horas = 0
            for (let i = 0; i < user.horas.length; i++) {
                if (user.horas[i].includes("Libre")) {
                    libre++
                } else if (user.horas[i].includes("Vacaciones")) {
                    vacaciones++
                } else {
                    horas = horas + (user.horas[i][1] - user.horas[i][0]) 
                }
    
            }
            return {
                nombre: user.nombre,
                horas: horas,
                vacaciones: vacaciones,
                dias_libres: libre
            }
        })
        AgregarUsuarioStats(UsersStats)
        setUserStats(UsersStats)
    }


    const handleArchivo = async (event) => {
        const file = event.target.files[0];
        setFileName(file.name);
        if (file) {
            try {
                const extractedText = await pdfToText(file);
                let textoFiltrado = extractedText.toLowerCase()
                    .replace(/\b[lL]\b/g, "0_Libre")
                    .replace(/\b[vV]\b/g, "0_Vacaciones")
                    .replace(/(?<!:)\b\d+\b(?!:)/g, "")
                    .replace(/festivo/g, "");
    
                let dias = extractedText.match(/(?<!:)\b\d+\b(?!:)/g);
    
                textoFiltrado = textoFiltrado.split(/\s(?=[a-zA-Z])/);
    
                let usuarios = await textoFiltrado.map((user) => {
                    if (/\d/.test(user)) {
                        let UserFiltrado = user.replace(/0_/g, "");
    
                        const [nombre, ...horas] = UserFiltrado.split(/\s+/);
    
                        let horasAEnteros = [];
                        for (let i = 0; i < horas.length; i++) {
                            if (/\d/.test(horas[i])) {
                                horasAEnteros.push(ConvertirHora(horas[i]));
                            } else {
                                horasAEnteros.push(horas[i]);
                            }
                        }
                        let hora = [];
                        for (let i = 0; i < horasAEnteros.length; i += 2) {
                            hora.push(horasAEnteros.slice(i, i + 2));
                        }
    
                        return {
                            nombre: nombre,
                            horas: hora.slice(0, -1),
                        };
                    }
                });
    
                usuarios = usuarios.filter((user) => user !== undefined);
                usuarios = await usuarios.reduce((acc, item) => {
                    if (!acc[item.nombre]) {
                        acc[item.nombre] = { nombre: item.nombre, horas: [...item.horas] };
                    } else {
                        acc[item.nombre].horas.push(...item.horas);
                    }
                    return acc;
                }, {});
    
                setUsers({
                    dias: dias,
                    usuarios,
                });
                AgregarUsuarios({
                    dias: dias,
                    usuarios,
                });
                ExtraerStats(usuarios);
            } catch (error) {
                console.error('Error al extraer el texto del PDF:', error);
            }
        }
    };
    



    useEffect(() => {
        setUserLoad(true)
    }, [])


    return (
        <>
            <div className={`contenedor-archivo container w-80 mt-4 rounded-3 align-content-center ${userLoad ? "animacion-contenedor activa" : "animacion-contenedor"}`} onClick={() => archivoRef.current.click()}>
                <input type="file" accept=".pdf" className="d-none" ref={archivoRef} onChange={handleArchivo} />
                <i className={`row icono-descarga`}>  <MdOutlineFileDownload /></i>
                <p className="text-center text-secondary">{users != "" ? "Archivo subido" : "Haz click para subir el archivo"}</p>
                {users != "" && <p className="text-center text-secondary opacity-50 mt-1">{fileName.split("\\")[fileName.split("\\").length - 1]}</p>}
            </div>
        </>
    )
}

export default ContenedorArchivo
