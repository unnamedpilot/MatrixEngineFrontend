// pages/NewtonMethod.jsx
import { useState, useCallback } from "react";
import RootFindingForm from "../components/RootFindingForm";
import ResultTable from "../components/ResultTable";
import DraggableResizableWindow from "../components/DraggableResizableWindow";
import DesmosGraph from "../components/DesmosGraph";
import { useApi } from "../hooks/useApi";

export default function NewtonMethod() {
    const [formData, setFormData] = useState({
        eqn: "",
        eqn1: "",
        xo: "",
        tol: "",
        niter: "",
    });

    const [results, setResults] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showGraph, setShowGraph] = useState(false);

    const { post } = useApi();

    // Manejar cambios en los campos del formulario
    const handleChange = useCallback((name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    // Validar el formulario antes de enviar
    const validateForm = () => {
        const { eqn, eqn1, xo, tol, niter } = formData;
        if (!eqn || !eqn1 || !xo || !tol || !niter) {
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
        if (!allowedChars.test(eqn) || !allowedChars.test(eqn1)) {
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
            ...formData,
            xo: parseFloat(formData.xo),
            tol: parseFloat(formData.tol),
            niter: parseInt(formData.niter, 10),
        };

        try {
            const response = await post("/newton", requestData);
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
            eqn: "ln(sin(x)**2 + 1) - 1/2",
            eqn1: "(2*sin(x)*cos(x))/(sin(x)**2 + 1)",
            xo: "0.5",
            tol: "1e-7",
            niter: "100",
        });
        setResults(null);
        setError("");
    };

    // Manejar el reinicio del formulario
    const handleReset = () => {
        setFormData({
            eqn: "",
            eqn1: "",
            xo: "",
            tol: "",
            niter: "",
        });
        setResults(null);
        setError("");
    };

    // Manejar la visualización del gráfico
    const handleShowGraph = () => {
        setShowGraph(!showGraph);
    };

    return (
        <div className="p-8 bg-white text-purple-700 min-h-screen relative">
            <h1 className="text-4xl font-bold mb-4">Newton Method</h1>
            <RootFindingForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
                inputs={[
                    { name: "eqn", type: "math", label: "Function \( f(x) \):", placeholder: "e.g., ln(sin(x)**2 + 1) - 1/2" },
                    { name: "eqn1", type: "math", label: "Derivative \( f'(x) \):", placeholder: "e.g., (2*sin(x)*cos(x))/(sin(x)**2 + 1)" },
                    { name: "xo", type: "number", label: "Initial Guess (\( x_0 \)):", placeholder: "e.g., 0.5" },
                    { name: "tol", type: "number", label: "Tolerance:", placeholder: "e.g., 0.001" },
                    { name: "niter", type: "number", label: "Max Iterations:", placeholder: "e.g., 25" },
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

            {/* Renderizar la Tabla de Resultados */}
            {results && <ResultTable results={results} />}

            {/* Botón para Mostrar/Ocultar el Gráfico */}
            {formData.eqn && (
                <button
                    onClick={handleShowGraph}
                    className="fixed bottom-8 right-8 bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-purple-600 transition"
                >
                    {showGraph ? "Hide Graph" : "Show Graph"}
                </button>
            )}

            {/* Ventana Draggable y Resizable para el Gráfico */}
            {showGraph && (
                <DraggableResizableWindow
                    title="Graph Visualization"
                    onClose={handleShowGraph}
                >
                    <DesmosGraph
                        functions={[
                            { expr: formData.eqn, color: "blue" },
                            { expr: formData.eqn1, color: "red" },
                        ]}
                    />
                </DraggableResizableWindow>
            )}
        </div>
    );
}
