import { useState } from "react";
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

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const { eqn, eqn1, xo, tol, niter } = formData;
        if (!eqn || !eqn1 || !xo || !tol || !niter) {
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
            ...formData,
            xo: parseFloat(formData.xo),
            tol: parseFloat(formData.tol),
            niter: parseInt(formData.niter, 10),
        };

        try {
            const data = await post("/api/newton", requestData);
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
            eqn: "\\ln(\\sin^2(x) + 1) - \\frac{1}{2}",
            eqn1: "\\frac{2\\sin(x)\\cos(x)}{\\sin^2(x) + 1}",
            xo: "0.5",
            tol: "1e-7",
            niter: "100",
        });
        setResults(null);
        setError("");
    };

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
                    { name: "eqn", type: "math", label: "Function \( f(x) \):" },
                    { name: "eqn1", type: "math", label: "Derivative \( f'(x) \):" },
                    { name: "xo", type: "number", label: "Initial Guess (\( x_0 \)):" },
                    { name: "tol", type: "number", label: "Tolerance:" },
                    { name: "niter", type: "number", label: "Max Iterations:" },
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
                >
                    {showGraph ? "Hide Graph" : "Show Graph"}
                </button>
            )}

            {showGraph && (
                <DraggableResizableWindow
                    title="Graph Visualization"
                    onClose={handleShowGraph}
                >
                    <DesmosGraph
                        functions={[
                            { latex: formData.eqn, color: "blue" },
                            { latex: formData.eqn1, color: "red" },
                        ]}
                    />
                </DraggableResizableWindow>
            )}
        </div>
    );
}
