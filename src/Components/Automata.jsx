/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './Automata.css';
import { useSpring, animated, useTransition } from "react-spring";

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

    const handlePush = () => {
        if (input.trim() !== "") {
            setStack([...stack, input]);
            setInput("");
        }
    };

    const handlePop = () => {
        if (stack.length > 0) {
            const newItems = [...stack];
            newItems.pop();
            setStack(newItems);
        }
    };

    const transitions = useTransition(stack.slice().reverse(), {
        from: { opacity: 0, height: 0, transform: "translateY(100%) rotateX(180deg) scale(0.8)" },
        enter: { opacity: 1, height: 50, transform: "translateY(0%) rotateX(0) scale(1)" },
        leave: { opacity: 0, height: 0, transform: "translateY(100%) rotateX(180deg) scale(0.8)" },
        config: { tension: 100, friction: 8 },
    });
    

    return (
        <div className="stack">
            {/* <h1>Simulador de Autómata de Pila</h1> */}
            <div>
                <input
                    type="text"
                    placeholder="Ingrese la cadena (ej: abccd)"
                    value={input}
                    onChange={handleChange}
                    style={{ marginRight: "20px", borderRadius: "5px", padding: "10px"}}
                />
                {/* <button onClick={handleSimulate}>Simular</button> */}
                <button onClick={handlePush}>Apilar</button>
                <button onClick={handlePop}>Desapilar</button>
            </div>
            <div>
            {transitions((props, item, _, index) => (
                <animated.div style={props}>
                    <StackItem text={item} index={index} />
                </animated.div>
            ))}
                {/* Mostrar animación gráfica de estados con el indicador de n y el contenido de la pila */}
            </div>
            {isAccepting ? <p>Aceptada</p> : <p>No Aceptada</p>}
      </div>
    );
}

const StackItem = ({ text, hidden, index }) => {
    const props = useSpring({
      opacity: hidden ? 0 : 1,
      transform: `translateY(${hidden ? index * 20 + 100 + "%" : "0"}) rotateX(${
        hidden ? "180deg" : "0"
      }) scale(${hidden ? 0.8 : 1})`,
      config: { tension: 220, friction: 18 },
    });
  
    return <animated.div className="stack-item" style={props}>{text}</animated.div>;
};

export default MyComponent;
