import { useState } from "react";
import { useApi } from "../hooks/useApi";
import MatrixInput from "../components/MatrixInput";
import ResultsRenderer from "../components/ResultsRenderer";

export default function LuPartial() {
    const [size, setSize] = useState(""); // Tamaño de la matriz
    const [matrixA, setMatrixA] = useState([]); // Matriz A
    const [matrixB, setMatrixB] = useState([]); // Vector b
    const [results, setResults] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { post } = useApi();

    const handleReset = () => {
        setSize("");
        setMatrixA([]);
        setMatrixB([]);
        setResults(null);
        setError("");
    };

    const handleTestValues = () => {
        const testMatrixA = [
            ['4', '-1', '0', '3'],
            ['1', '15.5', '3', '8'],
            ['0', '-1.3', '-4', '1.1'],
            ['14', '5', '-2', '30'],
        ];
        const testMatrixB = ['1', '1', '1', '1'];

        setSize(4);
        setMatrixA(testMatrixA);
        setMatrixB(testMatrixB);
        setResults(null);
        setError("");
    };

    const handleSubmit = async () => {
        const numericMatrixA = matrixA.map((row) => row.map((value) => parseFloat(value || 0)));
        const numericMatrixB = matrixB.map((value) => parseFloat(value || 0));

        setError("");
        setLoading(true);
        setResults(null);

        const requestData = { A: numericMatrixA, b: numericMatrixB };

        try {
            const { result } = await post("/LUpartial", requestData);
            setResults(result);
        } catch (err) {
            setError("Failed to fetch results. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-white text-purple-700 min-h-screen">
            <h1 className="text-4xl font-bold mb-4">LU Partial</h1>

            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={handleTestValues}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded"
                >
                    Test Values
                </button>
                <button
                    onClick={handleReset}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
                >
                    Reset
                </button>
            </div>

            <MatrixInput
                size={size}
                onSizeChange={setSize}
                matrixA={matrixA}
                onMatrixAChange={setMatrixA}
                matrixB={matrixB}
                onMatrixBChange={setMatrixB}
            />

            <button
                onClick={handleSubmit}
                className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded"
            >
                Submit
            </button>

            {error && <p className="mt-4 text-red-500">{error}</p>}
            {loading && <p className="mt-4">Loading...</p>}

            {results && (
                <ResultsRenderer
                    results={results}
                    additionalMatrices={{ P: results.P }}
                />
            )}
        </div>
    );
}
