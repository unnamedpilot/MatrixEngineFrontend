import { useState, useEffect } from "react";
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
    });

    const [results, setResults] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showGraph, setShowGraph] = useState(false);
    const [graphFunctions, setGraphFunctions] = useState([]);

    const { post } = useApi();

    useEffect(() => {
        // Dynamically update the graphFunctions array based on completed fields
        const functionsToPlot = [];
        if (formData.eqn) functionsToPlot.push({ latex: formData.eqn, color: "blue" });
        if (formData.eqn1) functionsToPlot.push({ latex: formData.eqn1, color: "green" });
        if (formData.eqn2) functionsToPlot.push({ latex: formData.eqn2, color: "red" });
        setGraphFunctions(functionsToPlot);
    }, [formData]);

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const { eqn, eqn1, eqn2, xo, tol } = formData;
        if (!eqn || !eqn1 || !eqn2 || !xo || !tol) {
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
            eqn: formData.eqn,
            eqn1: formData.eqn1,
            eqn2: formData.eqn2,
            xo: parseFloat(formData.xo),
            tol: parseFloat(formData.tol),
        };

        try {
            const data = await post("/raices-multiples", requestData);
            setResults(data);
        } catch (err) {
            setError(
                err.message === "Failed to fetch"
                    ? "The server is unavailable. Please try again later."
                    : "An error occurred while processing your request."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleTestValues = () => {
        setFormData({
            eqn: "\\exp{(x)} - x - 1", // Main equation in LaTeX
            eqn1: "\\exp{(x)} - 1", // First derivative in LaTeX
            eqn2: "\\exp{(x)}", // Second derivative in LaTeX
            xo: "1", // Initial guess
            tol: "1e-7", // Tolerance
        });
        setError("");
        setResults(null);
    };

    const handleReset = () => {
        setFormData({
            eqn: "",
            eqn1: "",
            eqn2: "",
            xo: "",
            tol: "",
        });
        setError("");
        setResults(null);
    };

    const handleShowGraph = () => {
        const functionsToPlot = [];
        if (formData.eqn) {
            functionsToPlot.push({ latex: formData.eqn, color: "blue" });
        }
        if (formData.eqn1) {
            functionsToPlot.push({ latex: formData.eqn1, color: "green" });
        }
        if (formData.eqn2) {
            functionsToPlot.push({ latex: formData.eqn2, color: "red" });
        }
        setGraphFunctions(functionsToPlot); // Updates the state for the graph
        setShowGraph(!showGraph); // Toggles the graph visibility
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
                    { name: "eqn", type: "math", label: "Function \( h(x) \):" },
                    { name: "eqn1", type: "math", label: "First Derivative \( h'(x) \):" },
                    { name: "eqn2", type: "math", label: "Second Derivative \( h''(x) \):" },
                    { name: "xo", type: "number", label: "Initial Guess (\( x_0 \)):" },
                    { name: "tol", type: "number", label: "Tolerance:" },
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
