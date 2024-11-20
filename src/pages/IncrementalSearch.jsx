// pages/IncrementalSearch.jsx
import { useState } from "react";
import RootFindingForm from "../components/RootFindingForm";
import ResultTable from "../components/ResultTable";
import DraggableResizableWindow from "../components/DraggableResizableWindow";
import DesmosGraph from "../components/DesmosGraph";
import { useApi } from "../hooks/useApi";
import { evaluate } from "mathjs"; // For robust math function validation

export default function IncrementalSearch() {
    const [formData, setFormData] = useState({
        funcion: "x^2 - 4",
        x0: "1",
        intervalo: "0.1",
        tol: "0.0001",
        max_iter: "100",
    });

    const [results, setResults] = useState(null);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showGraph, setShowGraph] = useState(false);
    const [graphFunctions, setGraphFunctions] = useState([]);

    const { post } = useApi();

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear the error for the field that's being edited
        setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const { funcion, x0, intervalo, tol, max_iter } = formData;
        const errors = {};

        if (!funcion.trim()) {
            errors.funcion = "Function is required.";
        } else if (!isValidMathFunction(funcion)) {
            errors.funcion = "Please enter a valid mathematical function.";
        }

        if (!x0.trim()) {
            errors.x0 = "x₀ is required.";
        } else if (isNaN(parseFloat(x0))) {
            errors.x0 = "x₀ must be a valid number.";
        }

        if (!intervalo.trim()) {
            errors.intervalo = "Interval is required.";
        } else if (isNaN(parseFloat(intervalo)) || parseFloat(intervalo) <= 0) {
            errors.intervalo = "Interval must be a positive number.";
        }

        if (!tol.trim()) {
            errors.tol = "Tolerance is required.";
        } else if (isNaN(parseFloat(tol)) || parseFloat(tol) <= 0) {
            errors.tol = "Tolerance must be a positive number.";
        }

        if (!max_iter.trim()) {
            errors.max_iter = "Maximum iterations are required.";
        } else if (!Number.isInteger(Number(max_iter)) || parseInt(max_iter, 10) <= 0) {
            errors.max_iter = "Maximum iterations must be a positive integer.";
        }

        setFieldErrors(errors);

        if (Object.keys(errors).length > 0) {
            setError("Please fix the errors in the form.");
            return false;
        }

        setError("");
        return true;
    };

    // Robust validation using mathjs
    const isValidMathFunction = (func) => {
        try {
            // Attempt to parse the function with a dummy variable
            evaluate(`f(x) = ${func}`);
            return true;
        } catch (error) {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError("");
        setResults(null);

        const requestData = {
            funcion: formData.funcion, // Matches backend naming
            x0: parseFloat(formData.x0),
            intervalo: parseFloat(formData.intervalo),
            tol: parseFloat(formData.tol),
            max_iter: parseInt(formData.max_iter, 10),
        };

        try {
            const data = await post("/incremental_search", requestData); // Replace with your actual endpoint
            console.log("API response:", data); // Inspect the response in the console
            setResults(data.result);
        } catch (err) {
            console.error("Submission error:", err);
            setError(
                err.message === "Failed to fetch"
                    ? "The server is unavailable. Please try again later."
                    : err.message || "An error occurred while processing your request."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleTestValues = () => {
        setFormData({
            funcion: "x^2 - 4",
            x0: "1",
            intervalo: "0.1",
            tol: "0.0001",
            max_iter: "100",
        });
        setFieldErrors({});
        setError("");
    };

    const handleReset = () => {
        setFormData({
            funcion: "",
            x0: "",
            intervalo: "",
            tol: "",
            max_iter: "",
        });
        setResults(null);
        setError("");
        setFieldErrors({});
    };

    const handleShowGraph = () => {
        const functionsToPlot = [];
        if (formData.funcion) {
            functionsToPlot.push({ latex: formData.funcion, color: "blue" });
        }
        setGraphFunctions(functionsToPlot);
        setShowGraph(!showGraph);
    };

    return (
        <div className="p-8 bg-white text-purple-700 min-h-screen relative">
            <h1 className="text-4xl font-bold mb-4">Incremental Search</h1>
            <RootFindingForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
                inputs={[
                    { name: "funcion", type: "math", label: "Function \( f(x) \):" },
                    { name: "x0", type: "number", label: "x₀:" },
                    { name: "intervalo", type: "number", label: "Interval:" },
                    { name: "tol", type: "number", label: "Tolerance:" },
                    { name: "max_iter", type: "number", label: "Maximum Iterations:" },
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
                errors={fieldErrors} // Pass field-specific errors
            />

            {results && <ResultTable results={results} />}

            {formData.funcion && (
                <button
                    onClick={handleShowGraph}
                    className="fixed bottom-8 right-8 bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-purple-600 transition"
                    title="Show Graph"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 10h4m-4 4h6m-6 4h8M3 6h2m14 0h2m-2 0a2 2 0 110 4m0 0a2 2 0 100 4m0 0a2 2 0 010 4m0-12V4m0 16v-2"
                        />
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
