import React, { useState } from 'react';

function About() {
    const [consultorio, setConsultorio] = useState('');
    const [ativo, setAtivo] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Faz alguma coisa com os valores dos inputs
    };

    return (
        <div>
            <h1>About</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="consultorio">Consultório</label>
                    <input
                        type="text"
                        id="consultorio"
                        value={consultorio}
                        placeholder="Digite o nome do consultório"
                        onChange={(event) => setConsultorio(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="ativo">Ativo</label>
                    <input
                        type="checkbox"
                        id="ativo"
                        checked={ativo}
                        onChange={(event) => setAtivo(event.target.checked)}
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default About;