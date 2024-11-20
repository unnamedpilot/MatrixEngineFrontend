import { useState } from "react";
import RootFindingForm from "../components/RootFindingForm";
import ResultTable from "../components/ResultTable";
import DraggableResizableWindow from "../components/DraggableResizableWindow";
import DesmosGraph from "../components/DesmosGraph";
import { useApi } from "../hooks/useApi";

export default function SecantMethod() {
    const [formData, setFormData] = useState({
        f: "",
        x0: "",
        x1: "",
        tol: "",
        max_iter: "",
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
        const { f, x0, x1, tol, max_iter } = formData;
        if (!f || !x0 || !x1 || !tol || !max_iter) {
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
            f: formData.f,
            x0: parseFloat(formData.x0),
            x1: parseFloat(formData.x1),
            tol: parseFloat(formData.tol),
            max_iter: parseInt(formData.max_iter, 10),
        };

        try {
            const data = await post("/api/secant", requestData);
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
            f: "\\ln(\\sin^2(x) + 1) - \\frac{1}{2}", // LaTeX for MathInput
            x0: "0.5",
            x1: "1.0",
            tol: "1e-7",
            max_iter: "100",
        });
        setResults(null);
        setError("");
    };

    const handleReset = () => {
        setFormData({
            f: "",
            x0: "",
            x1: "",
            tol: "",
            max_iter: "",
        });
        setResults(null);
        setError("");
    };

    const handleShowGraph = () => {
        setShowGraph(!showGraph);
    };

    return (
        <div className="p-8 bg-white text-purple-700 min-h-screen relative">
            <h1 className="text-4xl font-bold mb-4">Secant Method</h1>
            <RootFindingForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
                inputs={[
                    { name: "f", type: "math", label: "Function \( f(x) \):" },
                    { name: "x0", type: "number", label: "Initial Value (\( x_0 \)):" },
                    { name: "x1", type: "number", label: "Next Value (\( x_1 \)):" },
                    { name: "tol", type: "number", label: "Tolerance:" },
                    { name: "max_iter", type: "number", label: "Max Iterations:" },
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

            {formData.f && (
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
                            { latex: formData.f, color: "blue" },
                        ]}
                    />
                </DraggableResizableWindow>
            )}
        </div>
    );
}
