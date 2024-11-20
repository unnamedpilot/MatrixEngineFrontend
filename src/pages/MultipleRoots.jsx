// pages/MultipleRoots.jsx
import { useState, useEffect, useCallback } from "react";
import RootFindingForm from "../components/RootFindingForm";
import ResultTable from "../components/ResultTable";
import DraggableResizableWindow from "../components/DraggableResizableWindow";
import DesmosGraph from "../components/DesmosGraph";
import { useApi } from "../hooks/useApi";

export default function MultipleRoots() {
    const [formData, setFormData] = useState({
        eqn: "",
        eqn1: "",
        eqn2: "",
        xo: "",
        tol: "",
        niter: "",
    });

    const [results, setResults] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showGraph, setShowGraph] = useState(false);
    const [graphFunctions, setGraphFunctions] = useState([]);

    const { post } = useApi();

    // Manejar cambios en los campos del formulario
    const handleChange = useCallback((name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    // Validar el formulario antes de enviar
    const validateForm = () => {
        const { eqn, eqn1, eqn2, xo, tol, niter } = formData;
        if (!eqn || !eqn1 || !eqn2 || !xo || !tol || !niter) {
            setError("All fields are required.");
            return false;
        }

        // Verificar si xo, tol y niter son números válidos
        if (isNaN(parseFloat(xo))) {
            setError("Initial Guess (x₀) must be a valid number.");
            return false;
        }
        if (isNaN(parseFloat(tol)) || parseFloat(tol) <= 0) {
            setError("Tolerance must be a valid positive number.");
            return false;
        }
        if (isNaN(parseInt(niter, 10)) || parseInt(niter, 10) <= 0) {
            setError("Max Iterations must be a valid positive integer.");
            return false;
        }

        // Opcional: Verificar si las expresiones contienen caracteres permitidos
        const allowedChars = /^[\d\w\s\+\-\*\/\^\(\)\.]+$/;
        if (!allowedChars.test(eqn) || !allowedChars.test(eqn1) || !allowedChars.test(eqn2)) {
            setError("Functions contain invalid characters.");
            return false;
        }

        setError("");
        return true;
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError("");
        setResults(null);

        const requestData = {
            eqn: formData.eqn,
            eqn1: formData.eqn1,
            eqn2: formData.eqn2,
            xo: parseFloat(formData.xo),
            tol: parseFloat(formData.tol),
            niter: parseInt(formData.niter, 10),
        };

        try {
            const response = await post("/raicesMultiples", requestData);
            if (response.error) {
                setError(response.error);
            } else {
                setResults(response.result); // Asignar data.result según la estructura de salida
                console.log("API response:", response);
            }
        } catch (err) {
            console.error("Submission error:", err);
            setError(
                err.message === "Failed to fetch"
                    ? "The server is unavailable. Please try again later."
                    : "An error occurred while processing your request."
            );
        } finally {
            setLoading(false);
        }
    };

    // Manejar la inserción de valores de prueba
    const handleTestValues = () => {
        setFormData({
            eqn: "exp(x) - x - 1", // Main equation in SymPy compatible format
            eqn1: "exp(x) - 1",     // First derivative in SymPy compatible format
            eqn2: "exp(x)",         // Second derivative in SymPy compatible format
            xo: "1",                // Initial guess
            tol: "1e-7",            // Tolerance
            niter: "100",           // Max iterations
        });
        setError("");
        setResults(null);
    };

    // Manejar el reinicio del formulario
    const handleReset = () => {
        setFormData({
            eqn: "",
            eqn1: "",
            eqn2: "",
            xo: "",
            tol: "",
            niter: "",
        });
        setError("");
        setResults(null);
    };

    // Manejar la visualización del gráfico
    const handleShowGraph = () => {
        const functionsToPlot = [];
        if (formData.eqn) {
            functionsToPlot.push({ expr: formData.eqn, color: "blue" });
        }
        if (formData.eqn1) {
            functionsToPlot.push({ expr: formData.eqn1, color: "green" });
        }
        if (formData.eqn2) {
            functionsToPlot.push({ expr: formData.eqn2, color: "red" });
        }
        setGraphFunctions(functionsToPlot); // Actualiza las funciones para graficar
        setShowGraph(!showGraph); // Alterna la visibilidad del gráfico
    };

    return (
        <div className="p-8 bg-white text-purple-700 min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Multiple Roots</h1>
            <RootFindingForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
                inputs={[
                    { name: "eqn", type: "text", label: "Function \( h(x) \):", placeholder: "e.g., exp(x) - x - 1" },
                    { name: "eqn1", type: "text", label: "First Derivative \( h'(x) \):", placeholder: "e.g., exp(x) - 1" },
                    { name: "eqn2", type: "text", label: "Second Derivative \( h''(x) \):", placeholder: "e.g., exp(x)" },
                    { name: "xo", type: "number", label: "Initial Guess (\( x_0 \)):", placeholder: "e.g., 1" },
                    { name: "tol", type: "number", label: "Tolerance:", placeholder: "e.g., 1e-7" },
                    { name: "niter", type: "number", label: "Max Iterations:", placeholder: "e.g., 100" },
                ]}
                buttons={[
                    {
                        label: "Test Values",
                        onClick: handleTestValues,
                        className: "px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600",
                    },
                    {
                        label: "Reset",
                        onClick: handleReset,
                        className: "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600",
                    },
                ]}
            />
            {results && <ResultTable results={results} />}

            {formData.eqn && (
                <button
                    onClick={handleShowGraph}
                    className="fixed bottom-8 right-8 bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-purple-600 transition"
                    title="Show Graph"
                >
                    {/* Icono Opcional: Puedes reemplazarlo por otro si lo prefieres */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h4m-4 4h6m-6 4h8M3 6h2m14 0h2m-2 0a2 2 0 110 4m0 0a2 2 0 100 4m0 0a2 2 0 010 4m0-12V4m0 16v-2" />
                    </svg>
                </button>
            )}

            {showGraph && (
                <DraggableResizableWindow
                    title="Graph Visualization"
                    onClose={() => setShowGraph(false)}
                >
                    <DesmosGraph functions={graphFunctions} />
                </DraggableResizableWindow>
            )}
        </div>
    );
}
