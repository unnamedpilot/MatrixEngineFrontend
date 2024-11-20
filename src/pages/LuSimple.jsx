import { useState } from "react";
import { useApi } from "../hooks/useApi";
import ResultsRenderer from "../components/ResultsRenderer";

export default function LuSimple() {
    const [size, setSize] = useState(""); // Matrix size
    const [matrixA, setMatrixA] = useState([]); // Matrix A
    const [matrixB, setMatrixB] = useState([]); // Matrix B
    const [results, setResults] = useState(null); // Results from the backend
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { post } = useApi();

    // Function to reset all fields
    const handleReset = () => {
        setSize("");
        setMatrixA([]);
        setMatrixB([]);
        setResults(null);
        setError("");
    };

    // Function to populate test values
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

    const handleSizeChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setSize(value);
            const emptyMatrixA = Array(value).fill(Array(value).fill(""));
            const emptyMatrixB = Array(value).fill("");
            setMatrixA(emptyMatrixA);
            setMatrixB(emptyMatrixB);
        }
    };

    const handleMatrixAChange = (row, col, value) => {
        const newMatrixA = [...matrixA];
        newMatrixA[row][col] = parseFloat(value);
        setMatrixA(newMatrixA);
    };

    const handleMatrixBChange = (row, value) => {
        const newMatrixB = [...matrixB];
        newMatrixB[row] = parseFloat(value);
        setMatrixB(newMatrixB);
    };

    const handleSubmit = async () => {
        if (!matrixA.length || !matrixB.length) {
            setError("Please fill all the matrix fields.");
            return;
        }

        setError("");
        setLoading(true);
        setResults(null);

        const requestData = { A: matrixA, b: matrixB };

        try {
            const { result } = await post("/LUsimple", requestData);
            setResults(result);
        } catch (err) {
            setError("Failed to fetch results. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-white text-purple-700 min-h-screen">
            <h1 className="text-4xl font-bold mb-4">LU Simple</h1>

            <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-4">
                    {/* Test Values Button */}
                    <button
                        onClick={handleTestValues}
                        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded"
                    >
                        Test Values
                    </button>

                    {/* Reset Button */}
                    <button
                        onClick={handleReset}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
                    >
                        Reset
                    </button>
                </div>
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
                        <h2 className="text-xl font-semibold mb-4">Matrix B</h2>
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

            {size > 0 && (
                <button
                    onClick={handleSubmit}
                    className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded"
                >
                    Submit
                </button>
            )}

            {error && <p className="mt-4 text-red-500">{error}</p>}
            {loading && <p className="mt-4">Loading...</p>}

            {results && <ResultsRenderer results={results} />}
        </div>
    );
}
