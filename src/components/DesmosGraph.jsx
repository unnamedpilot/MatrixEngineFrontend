import React, { useEffect, useRef } from "react";
import Desmos from "desmos";


export default function DesmosGraph({ functions = [] }) {
    const calculatorRef = useRef(null);
    const desmosContainerRef = useRef(null);

    useEffect(() => {
        if (!calculatorRef.current && desmosContainerRef.current) {
            calculatorRef.current = Desmos.GraphingCalculator(desmosContainerRef.current, {
                expressions: true,
                keypad: false,
            });
        }

        const calculator = calculatorRef.current;

        // Clear the graph before rendering new functions
        calculator?.setBlank();

        // Add functions to the graph
        functions.forEach((fn, index) => {
            calculator?.setExpression({
                id: `fn${index}`,
                latex: fn.latex,
                color: fn.color || "#000000", // Default to black if color not specified
            });
        });

        return () => {
            // Clean up on unmount
            if (calculatorRef.current) {
                calculatorRef.current.destroy();
                calculatorRef.current = null;
            }
        };
    }, [functions]);

    return <div ref={desmosContainerRef} style={{ width: "100%", height: "400px" }} />;
}
