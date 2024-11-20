import { useState } from "react";
import { useApi } from "../hooks/useApi";
import ResultsRenderer from "../components/ResultsRenderer";

export default function PartialPivoting() {
    const [size, setSize] = useState(""); // Tamaño de la matriz
    const [matrixA, setMatrixA] = useState([]); // Matriz A
    const [matrixB, setMatrixB] = useState([]); // Vector b
    const [results, setResults] = useState(null); // Resultados
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { post } = useApi();

    // Manejo del tamaño de la matriz
    const handleSizeChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setSize(value);
            setMatrixA(Array(value).fill(Array(value).fill("")));
            setMatrixB(Array(value).fill(""));
            setResults(null);
            setError("");
        }
    };

    // Manejo de cambios en Matriz A
    const handleMatrixAChange = (row, col, value) => {
        const newMatrixA = [...matrixA];
        newMatrixA[row][col] = value === "" ? "" : parseFloat(value);
        setMatrixA(newMatrixA);
    };

    // Manejo de cambios en Vector b
    const handleMatrixBChange = (index, value) => {
        const newMatrixB = [...matrixB];
        newMatrixB[index] = value === "" ? "" : parseFloat(value);
        setMatrixB(newMatrixB);
    };

    // Validación y envío de los datos
    const handleSubmit = async () => {
        if (!matrixA.length || !matrixB.length) {
            setError("All fields are required.");
            return;
        }

        if (matrixA.length !== matrixA[0].length) {
            setError("Matrix A must be square.");
            return;
        }

        if (matrixA.length !== matrixB.length) {
            setError("The size of Matrix A must match the size of Vector b.");
            return;
        }

        const requestData = {
            A: matrixA,
            b: matrixB,
        };

        setError("");
        setLoading(true);
        setResults(null);

        try {
            const data = await post("/partial_pivoting", requestData);
            setResults(data);
        } catch (err) {
            setError(err.message || "An error occurred while processing your request.");
        } finally {
            setLoading(false);
        }
    };

    // Valores de prueba
    const handleTestValues = () => {
        const testMatrixA = [
            [4, -1, 0, 3],
            [1, 15.5, 3, 8],
            [0, -1.3, -4, 1.1],
            [14, 5, -2, 30],
        ];
        const testMatrixB = [1, 1, 1, 1];

        setSize(4);
        setMatrixA(testMatrixA);
        setMatrixB(testMatrixB);
        setResults(null);
        setError("");
    };

    // Renderización
    return (
        <div className="p-8 bg-white text-purple-700 min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Partial Pivoting</h1>

            <div className="flex space-x-4 mb-6">
                <button
                    onClick={handleTestValues}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded"
                >
                    Test Values
                </button>
                <button
                    onClick={() => {
                        setSize("");
                        setMatrixA([]);
                        setMatrixB([]);
                        setResults(null);
                        setError("");
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
                >
                    Reset
                </button>
            </div>

            <div className="mb-6">
                <label htmlFor="size" className="block text-lg font-semibold mb-2">
                    Matrix size (n x n):
                </label>
                <input
                    type="number"
                    id="size"
                    value={size}
                    onChange={handleSizeChange}
                    className="border border-purple-300 rounded px-4 py-2 w-full"
                />
            </div>

            {size > 0 && (
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Matrix A</h2>
                        {matrixA.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex space-x-2">
                                {row.map((value, colIndex) => (
                                    <input
                                        key={`${rowIndex}-${colIndex}`}
                                        type="number"
                                        value={value}
                                        onChange={(e) =>
                                            handleMatrixAChange(rowIndex, colIndex, e.target.value)
                                        }
                                        className="border border-purple-300 rounded px-2 py-1 w-16 text-center"
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Vector b</h2>
                        {matrixB.map((value, rowIndex) => (
                            <input
                                key={`b-${rowIndex}`}
                                type="number"
                                value={value}
                                onChange={(e) => handleMatrixBChange(rowIndex, e.target.value)}
                                className="border border-purple-300 rounded px-2 py-1 w-16 text-center"
                            />
                        ))}
                    </div>
                </div>
            )}

            <button
                onClick={handleSubmit}
                className={`mt-6 bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded ${
                    !size ? "cursor-not-allowed opacity-50" : ""
                }`}
            >
                Submit
            </button>

            {error && <p className="mt-4 text-red-500">{error}</p>}
            {loading && <p className="mt-4">Loading...</p>}

            {results && (
                <div>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Augmented Matrix</h2>
                    <ResultsRenderer matrix={results.matriz_aumentada} />

                    <h2 className="text-2xl font-bold mt-8 mb-4">Solutions</h2>
                    <ul>
                        {results.soluciones.map((sol, index) => (
                            <li key={index} className="mb-2">
                                {`${sol.variable}: ${sol.valor.toFixed(6)}`}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
