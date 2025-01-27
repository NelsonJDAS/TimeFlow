import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
      <div className="flex justify-center items-center flex-col mb-[100px]">
        <h1 className="text-center text-3xl font-bold underline">
          Comprobación traducciones
        </h1>
        <h1 className="text-center text-2xl">{t("home")}</h1>
        <div>
        <button
          onClick={() => changeLanguage("en")}
          className="m-2 p-2 bg-blue-500 text-white rounded"
        >
          English
        </button>
        <button
          onClick={() => changeLanguage("es")}
          className="m-2 p-2 bg-blue-500 text-white rounded"
        >
          Español
        </button>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col">
      <h1 className="text-center text-3xl font-bold underline mb-9">
        Comprobación backend / API
      </h1>
      <h2>{message || "Loading..."}</h2>
      </div>
    </div>
  );
};

export default Home;
