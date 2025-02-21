import { useEffect, useState } from "react"
import header from "../img/header.png"

const Header = () => {
    const [userLoad, setUserLoad] = useState(false);

    useEffect(() => {
        setUserLoad(true)
    }, [])

  return (
    <header className="header-height">
        <img src={header} alt=""  className={`img-fluid position-absolute ${userLoad ? "animacion-desvanecer activa" : "animacion-desvanecer"}`}/>
        <div className="row position-absolute">
            <div className="col-12 mt-5 ml-5 fw-bold text-white fs-5">
                <p className={`${userLoad ? "animacion-izq activa" : "animacion-izq" }`}>TimeFlow</p>
            </div>
        </div>
    </header>
  )
}

export default Header
