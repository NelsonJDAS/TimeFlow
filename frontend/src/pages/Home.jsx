import React, { useEffect, useState } from 'react';

const Home = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        // Función para obtener el mensaje del backend
        const fetchMessage = async () => {
            try {
                const response = await fetch('http://localhost:5000/ms'); // Ruta del backend
                if (!response.ok) {
                    throw new Error('Failed to fetch message');
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
            <h1>Home Component</h1>
            <h2>{message || 'Loading...'}</h2>
        </div>
    );
};

export default Home;
