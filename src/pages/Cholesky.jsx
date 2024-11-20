import { useState } from "react";
import { useApi } from "../hooks/useApi";
import MatrixInput from "../components/MatrixInput";
import ResultsRenderer from "../components/ResultsRenderer";
import MatrixRenderer from "../components/MatrixRenderer";

export default function Cholesky() {
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
            ['6', '15', '55'],
            ['15', '55', '225'],
            ['55', '225', '979'],
        ];
        const testMatrixB = ['76', '295', '1259'];

        setSize(3);
        setMatrixA(testMatrixA);
        setMatrixB(testMatrixB);
        setResults(null);
        setError("");
    };

    const handleSubmit = async () => {
        const numericMatrixA = matrixA.map((row) => row.map((value) => parseFloat(value || 0)));
        const numericMatrixB = matrixB.map((value) => parseFloat(value || 0));

        if (!numericMatrixA.length || !numericMatrixB.length) {
            setError("Please fill all the matrix fields.");
            return;
        }

        if (numericMatrixA.length !== numericMatrixA[0].length) {
            setError("Matrix A must be square.");
            return;
        }

        if (numericMatrixA.length !== numericMatrixB.length) {
            setError("The size of Matrix A must match the size of Vector b.");
            return;
        }

        setError("");
        setLoading(true);
        setResults(null);

        const requestData = { A: numericMatrixA, b: numericMatrixB };

        try {
            const { result } = await post("/cholesky", requestData);
            console.log(result);
            setResults(result);
        } catch (err) {
            setError(err.message || "Failed to fetch results. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-white text-purple-700 min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Cholesky Method</h1>

            <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-4">
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
                <div>
                    <h2 className="text-2xl font-bold mb-4">Results</h2>

                    {/* Vector solución */}
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold">Solution:</h3>
                        <ul className="list-disc list-inside">
                            {results.solution.map((value, index) => (
                                <li key={index}>
                                    x{index + 1}: {value.toFixed(6)}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Matrices L y U */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <MatrixRenderer
                            matrix={results.lower_triangular_matrix}
                            label="Lower Triangular Matrix (L)"
                        />
                        <MatrixRenderer
                            matrix={results.upper_triangular_matrix}
                            label="Upper Triangular Matrix (U)"
                        />
                    </div>


                    {/* Etapas */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Stages:</h3>
                        {results.stages.map((stage, index) => (
                            <div key={index} className="mb-4">
                                <h4 className="text-lg font-semibold">Stage {stage.etapa}</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <MatrixRenderer matrix={stage.L} label="L" />
                                    <MatrixRenderer matrix={stage.U} label="U" />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}

        </div>
    );
}
