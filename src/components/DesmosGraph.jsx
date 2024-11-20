// components/DesmosGraph.jsx
import React, { useEffect, useRef } from "react";
import Desmos from "desmos";

export default function DesmosGraph({ functions }) {
    const desmosDiv = useRef(null);
    const calculatorRef = useRef(null);

    useEffect(() => {
        if (desmosDiv.current) {
            calculatorRef.current = Desmos.GraphingCalculator(desmosDiv.current, {
                expressions: true,
                decimals: 6,
                keypad: false,
                settingsMenu: false,
            });

            // Añadir funciones
            functions.forEach((func) => {
                calculatorRef.current.setExpression({ latex: func.expr, color: func.color });
            });
        }

        return () => {
            if (calculatorRef.current) {
                calculatorRef.current.destroy();
            }
        };
    }, [functions]);

    return <div ref={desmosDiv} style={{ width: "100%", height: "500px" }}></div>;
}
