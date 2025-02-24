import { useEffect, useState } from "react";

const Presentacion = () => {
    const [userLoad, setUserLoad] = useState(false);

    useEffect(() => {
        setUserLoad(true)
    }, [])

    return (
        <div className={`container mb-4 ${userLoad ? "animacion-descripcion activa" : "animacion-descripcion"}`}>
            <h1 className="mb-3 text-center  text-info fw-bold fs-2">Bievenido a TimeFlow</h1>
            <p className="text-secondary px-2">
                Timeflow es la app que simplifica la gestión de tu horario.
                Solo necesitas seleccionar tu archivo de Word y
                Timeflow realiza automáticamente el recuento de tus
                actividades, entregándote un resumen claro y organizado.
                ¡Organiza tu tiempo de forma eficiente con solo unos clics!
            </p>
        </div>
    )
}

export default Presentacion
