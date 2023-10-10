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
        const input = this.state.input;
        const stack = [];
        let currentState = 'q0';
        let isAccepting = false;

        for (let i = 0; i < input.length; i++) {
            const symbol = input[i];

            // Transiciones del autómata
            if (currentState === 'q0' && symbol === 'a') {
                currentState = 'q1';
                stack.push(symbol);
            } else if (currentState === 'q1' && symbol === 'b') {
                stack.push(symbol);
            } else if (currentState === 'q1' && symbol === 'c') {
                currentState = 'q2';
                stack.pop(); // Pop 'b' from the stack
            } else if (currentState === 'q2' && symbol === 'd') {
                stack.pop(); // Pop 'c' from the stack
            } else {
                // Si no se cumple una transición, la cadena no es aceptada
                isAccepting = false;
                break;
            }

            // Verificar si la cadena es aceptada al final
            if (i === input.length - 1) {
                isAccepting = currentState === 'q2' && stack.length === 0;
            }
        }

        this.setState({ stack, currentState, isAccepting });
    };

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
