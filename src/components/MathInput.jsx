import { useEffect, useRef } from "react";
import { MathfieldElement } from "mathlive";

export default function MathInput({ value, onChange, label }) {
    const mathFieldRef = useRef(null);

    // Synchronize Mathfield value with React state
    useEffect(() => {
        if (mathFieldRef.current && mathFieldRef.current.getValue() !== value) {
            mathFieldRef.current.setValue(value);
        }
    }, [value]);

    // Handle paste event
    useEffect(() => {
        const handlePaste = (event) => {
            // Prevent the default paste behavior
            event.preventDefault();

            // Safely access the clipboard content
            const pastedContent = (event.clipboardData || window.clipboardData)?.getData("text") || "";
            console.log("Pasted content:", pastedContent);

            // Optionally, insert the pasted content into the MathField
            if (mathFieldRef.current && pastedContent) {
                mathFieldRef.current.insert(pastedContent);
            }
        };

        if (mathFieldRef.current) {
            mathFieldRef.current.addEventListener("paste", handlePaste);
        }

        return () => {
            if (mathFieldRef.current) {
                mathFieldRef.current.removeEventListener("paste", handlePaste);
            }
        };
    }, []);

    // Handle user input and update React state
    useEffect(() => {
        if (mathFieldRef.current) {
            mathFieldRef.current.addEventListener("input", (event) => {
                const latexValue = event.target.getValue();
                onChange(latexValue);
            });
        }
    }, [onChange]);

    return (
        <div className="mb-4">
            {label && <label className="block text-lg font-semibold mb-2">{label}</label>}
            <math-field
                ref={mathFieldRef}
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    padding: "10px",
                    fontSize: "1.2rem",
                    width: "100%",
                }}
            />
        </div>
    );
}
