import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../../components/Header";
import Presentacion from "../../../components/Presentacion";
import ContenedorArchivo from "../../../components/ContenedorArchivo";
import Footer from "../../../components/Footer";
import ContenedorHoras from "../../../components/ContenedorHoras";

const Home = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Cambia el idioma
  };

  useEffect(() => {
    // Función para obtener el mensaje del backend
    const fetchMessage = async () => {
      try {
        const response = await fetch("http://localhost:5000/ms"); // Ruta del backend
        if (!response.ok) {
          throw new Error("Failed to fetch message");
        }
        const data = await response.json();
        setMessage(data.message); // Guardar el mensaje en el estado
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMessage();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Header/>
      <Presentacion/>
      <ContenedorArchivo/>
      <ContenedorHoras/>
      <Footer/>
    </div>
  );
};

export default Home;
