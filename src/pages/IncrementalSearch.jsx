import { useState } from "react";
import RootFindingForm from "../components/RootFindingForm";
import ResultTable from "../components/ResultTable";
import DraggableResizableWindow from "../components/DraggableResizableWindow";
import DesmosGraph from "../components/DesmosGraph";
import { useApi } from "../hooks/useApi";

export default function IncrementalSearches() {
    const [formData, setFormData] = useState({
        function: "",
        x0: "",
        delta: "",
        maxIteraciones: "",
        tipoError: "absoluto",
    });

    const [results, setResults] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showGraph, setShowGraph] = useState(false);
    const [graphFunctions, setGraphFunctions] = useState([]);

    const { post } = useApi();

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const { function: func, x0, delta, maxIteraciones } = formData;
        if (!func || !x0 || !delta || !maxIteraciones) {
            setError("All fields are required.");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError("");
        setResults(null);

        const requestData = {
            function: formData.function,
            x0: parseFloat(formData.x0),
            delta: parseFloat(formData.delta),
            maxIteraciones: parseInt(formData.maxIteraciones, 10),
            tipoError: formData.tipoError,
        };

        try {
            const data = await post("/incremental_search", requestData);
            setResults(data);
        } catch (err) {
            setError("Failed to fetch results. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleTestValues = () => {
        setFormData({
            function: "\\sin(x) + 2", // LaTeX format
            x0: "-3",
            delta: "0.5",
            maxIteraciones: "50",
            tipoError: "absoluto",
        });
    };

    const handleReset = () => {
        setFormData({
            function: "",
            x0: "",
            delta: "",
            maxIteraciones: "",
            tipoError: "absoluto",
        });
    };

    const handleShowGraph = () => {
        if (formData.function) {
            setGraphFunctions([{ latex: formData.function, color: "blue" }]);
            setShowGraph(true);
        }
    };

    return (
        <div className="p-8 bg-white text-purple-700 min-h-screen relative">
            <h1 className="text-4xl font-bold mb-4">Incremental Searches</h1>
            <RootFindingForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
                inputs={[
                    { name: "function", type: "math", label: "Function \( f(x) \):" },
                    { name: "x0", type: "number", label: "Initial Value (\( x_0 \)):" },
                    { name: "delta", type: "number", label: "Increment (\( \delta \)):" },
                    { name: "maxIteraciones", type: "number", label: "Max Iterations:" },
                    { name: "tipoError", type: "select", label: "Error Type:" },
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

            {formData.function && (
                <button
                    onClick={handleShowGraph}
                    className="fixed bottom-8 right-8 bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-purple-600 transition"
                    title="Show Graph"
                >
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
