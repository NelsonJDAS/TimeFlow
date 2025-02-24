import footer from "../img/footer.png"
import { FaRegCopyright } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="align-content-end"
        style={{
            backgroundImage: `url(${footer})`,
            backgroundSize: 'cover',           
            backgroundPosition: 'center',     
            width: '100%',                   
            height: '150px',
            margin: "-40px 0 0 0"               
        }}
        >

            <div className="row">
                <div className="col-7">
                <p className="creador-footer text-secondary">Creado por <a href="https://github.com/NelsonJDAS" target="_blank">NelsonJDAS</a></p>
                </div>
                <div className="col-5 align-content-end mb-4">
                        <p className="d-flex text-secondary derechos-footer justify-content-center">Derechos de autor <i className="mx-1 mt-1"><FaRegCopyright /></i></p>
                </div>
                <div className="col-12 d-flex justify-content-end">
                    <a target="_blank" href="https://www.linkedin.com/in/nelson-de-abreu-ab87042b6/" className="icono-footer mb-2 text-primary"><FaLinkedin /></a>
                    <a target="_blank" href="https://github.com/NelsonJDAS" className="icono-footer mb-2 mx-2"><FaSquareGithub /></a>
                </div>
            </div>


        </div>
    )
}

export default Footer
