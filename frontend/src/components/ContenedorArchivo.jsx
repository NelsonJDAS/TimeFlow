import { MdOutlineFileDownload } from "react-icons/md";
import { useEffect, useRef, useState } from "react"
import { useStore } from "../Store/store"
import pdfToText from 'react-pdftotext';


const ContenedorArchivo = () => {
    //variable que ejecuta la animacion
    const [userLoad, setUserLoad] = useState(false);

    //variables de respaldo si no funciona la localstorage
    const [users, setUsers] = useState("");
    const [userStats, setUserStats] = useState("");

    //contenedor con el nombre del archivo para pintarlo visualmente
    const [fileName, setFileName] = useState("");
    //variables globales
    const { usuarios, usuariosStats } = useStore();

    //funciones globales
    const AgregarUsuarios = useStore((state) => state.AgregarUsuarios)
    const AgregarUsuarioStats = useStore((state) => state.AgregarUsuarioStats)

    // referencia al input que abre el selector de archivos
    const archivoRef = useRef("");

    //convertir la hora a decimal por ejemplo 16:30 = 16,5
    const ConvertirHora = (hora) => {
        const [horas, minutos] = hora.split(':').map(Number);
        return horas + minutos / 60;
    }

    //funcion para extraer estadisticas de cada usuario
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
                } else if (/\d/.test(user.horas[i])){
                    horas = horas + (user.horas[i][1] - user.horas[i][0]) 
                } else {}
            }
            for (let i = 0; i < user.partido.length; i++) {
                if (/\d/.test(user.partido[i])) {
                    horas = horas + (user.partido[i][1] - user.partido[i][0]) 
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


    // funcion principal de la pagina
    const handleArchivo = async (event) => {
        //recolectamos el archivo subido
        const file = event.target.files[0];
        if (file) {
            // verificamos y limpiamos los archivos ya cargados
            setFileName(file.name); // guardamos el nombre
            AgregarUsuarios("");
            try {
                //extraemos el texto
                const extractedText = await pdfToText(file);

                //limpiamos todo el texto, todos los caracteres que no seas utiles
                let textoFiltrado = extractedText.toLowerCase()
                .replace(/\b[lL]\b/g, "0_Libre")
                .replace(/\b[vV]\b/g, "0_Vacaciones")
                .replace(/(?<!:)\b\d+\b(?!:)/g, "")
                .replace(/festivo/g, "");
                
                //dividimos el texto a base de arrays
                textoFiltrado = textoFiltrado.split(/\s(?=[a-zA-Z])/);

                //limpiamos los decoradores que separaban los usuarios y los filtramos dando un objeto con su nombre, horas y horas de turno partidos
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
                            horas: hora.slice(0, 14),
                            partido: hora.slice(0, -1).slice(14, horas.length),
                        };
                    }
                });
                
                usuarios = usuarios.filter((user) => user !== undefined);
                usuarios = await usuarios.reduce((acc, item) => {
                    if (!acc[item.nombre]) {
                        acc[item.nombre] = { nombre: item.nombre, horas: [...item.horas], partido: [...item.partido] };
                    } else {
                        acc[item.nombre].horas.push(...item.horas);
                        acc[item.nombre].partido.push(...item.partido);
                    }
                    return acc;
                }, {});
                
                // extraemos los dias del texto
                let dias = extractedText.match(/(?<!:)\b\d+\b(?!:)/g);

                // dividimos los dias por si hay mas de un mes es decir que no se repitan los numeros
                dias = dias.reduce((acc, item) => {
                    if (!acc.vistos.has(item)) {
                        acc.primermes.push(item);
                        acc.vistos.add(item); 
                    } else {
                        acc.segundomes.push(item);
                    }
                    return acc;
                }, { primermes: [], segundomes: [], vistos: new Set() });

                
                // los ordenamos de menor a mayor
                dias = dias.primermes.sort((a,b) => a-b).concat(dias.segundomes.sort((a,b) => a-b))
                
    
                //subimos los datos tanto global como localmente en el componente
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
                <i className={`row mx-0 px-0 icono-descarga`}>  <MdOutlineFileDownload /></i>
                <p className="text-center text-secondary">{users != "" ? "Archivo subido" : "Haz click para subir el archivo"}</p>
                {users != "" && <p className="text-center text-secondary opacity-50 mt-1">{fileName.split("\\")[fileName.split("\\").length - 1]}</p>}
            </div>
        </>
    )
}

export default ContenedorArchivo
