import React, { useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export default function EquationInput({ value, onChange }) {
    const [renderedEquation, setRenderedEquation] = useState("");
    const [isValid, setIsValid] = useState(true);

    const handleInputChange = (e) => {
        const input = e.target.value;

        // Update parent state
        if (onChange) {
            onChange(input);
        }

        // Try to render the equation
        try {
            const rendered = katex.renderToString(input, {
                throwOnError: false,
            });
            setRenderedEquation(rendered);
            setIsValid(true);
        } catch (error) {
            setRenderedEquation("Invalid equation");
            setIsValid(false);
        }
    };

    return (
        <div className="mb-4">
            <label htmlFor="equation-input" className="block text-lg font-semibold mb-2">
                Enter your equation:
            </label>
            <input
                type="text"
                id="equation-input"
                value={value}
                onChange={handleInputChange}
                className={`border rounded px-4 py-2 w-full ${
                    isValid ? "border-purple-300" : "border-red-500"
                }`}
                placeholder="e.g., ln(sin(x)^2 + 1) - 1/2"
            />
            <div className="mt-2 p-2 bg-purple-50 rounded shadow-md text-center">
                <div
                    className={`text-lg ${!isValid ? "text-red-500" : "text-gray-700"}`}
                    dangerouslySetInnerHTML={{ __html: renderedEquation }}
                ></div>
            </div>
        </div>
    );
}
