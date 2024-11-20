import { useState } from "react";
import RootFindingForm from "../components/RootFindingForm";
import ResultTable from "../components/ResultTable";
import DraggableResizableWindow from "../components/DraggableResizableWindow";
import DesmosGraph from "../components/DesmosGraph";
import { useApi } from "../hooks/useApi";

export default function Bisection() {
    const [formData, setFormData] = useState({
        eqn: "",
        xi: "",
        xf: "",
        tol: "",
        niter: "", // New field for maximum iterations
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
        const { eqn, xi, xf, tol, niter } = formData;
        if (!eqn || !xi || !xf || !tol || !niter) {
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
            xi: parseFloat(formData.xi),
            xf: parseFloat(formData.xf),
            tol: parseFloat(formData.tol),
            niter: parseInt(formData.niter, 10), // Send maximum iterations
        };

        try {
            const data = await post("/biseccion", requestData);
            console.log(requestData);
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
            eqn: "\\ln(\\sin^2(x) + 1) - \\frac{1}{2}", // Function in LaTeX
            xi: "0",
            xf: "1",
            tol: "1e-7",
            niter: "100", // New test value for iterations
        });
    };

    const handleReset = () => {
        setFormData({
            eqn: "",
            xi: "",
            xf: "",
            tol: "",
            niter: "",
        });
        setResults(null);
        setError("");
    };

    const handleShowGraph = () => {
        const functionsToPlot = [];
        if (formData.eqn) {
            functionsToPlot.push({ latex: formData.eqn, color: "blue" });
        }
        setGraphFunctions(functionsToPlot);
        setShowGraph(!showGraph);
    };

    return (
        <div className="p-8 bg-white text-purple-700 min-h-screen relative">
            <h1 className="text-4xl font-bold mb-4">Bisection</h1>
            <RootFindingForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
                inputs={[
                    { name: "eqn", type: "math", label: "Function \( f(x) \):" },
                    { name: "xi", type: "number", label: "Lower Limit (\( x_i \)):" },
                    { name: "xf", type: "number", label: "Upper Limit (\( x_f \)):" },
                    { name: "tol", type: "number", label: "Tolerance:" },
                    { name: "niter", type: "number", label: "Max Iterations:" }, // New input field
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
