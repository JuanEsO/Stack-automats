import React, { useState } from 'react';

function MyComponent(props) {
    const [input, setInput] = useState("");
    const [stack, setStack] = useState([]);
    const [currentState, setCurrentState] = useState("q0");
    const [isAccepting, setAccept] = useState(false);

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleSimulate = () => {
        // automate logic goes here
    }

    return (
        <div>
            <h1>Simulador de Autómata de Pila</h1>
            <div>
                <input
                    type="text"
                    placeholder="Ingrese la cadena (ej: abccd)"
                    value={input}
                    onChange={handleChange}
                    style={{ marginRight: "20px", borderRadius: "5px", padding: "10px"}}
                />
                <button onClick={handleSimulate}>Simular</button>
            </div>
            <div>
                {/* Mostrar animación gráfica de estados con el indicador de n y el contenido de la pila */}
            </div>
            {isAccepting ? <p>Aceptada</p> : <p>No Aceptada</p>}
      </div>
    );
}

export default MyComponent;
