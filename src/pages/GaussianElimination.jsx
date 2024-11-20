// pages/GaussianElimination.jsx
import { useState } from "react";
import { useApi } from "../hooks/useApi";
import GaussianResults from "../components/GaussianResults.jsx";

export default function GaussianElimination() {
    const [size, setSize] = useState(""); // Size of the matrix (as string)
    const [matrixA, setMatrixA] = useState([]); // Matrix A
    const [matrixB, setMatrixB] = useState([]); // Vector b
    const [pivotType, setPivotType] = useState("none"); // Pivoting type
    const [results, setResults] = useState(null); // Results
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { post } = useApi();

    // Handle matrix size change
    const handleSizeChange = (e) => {
        const value = e.target.value;
        setSize(value);

        const parsedValue = parseInt(value, 10);

        if (!isNaN(parsedValue) && parsedValue > 0) {
            // Initialize Matrix A as a 2D array filled with empty strings
            setMatrixA(Array.from({ length: parsedValue }, () => Array(parsedValue).fill("")));
            // Initialize Vector b as an array filled with empty strings
            setMatrixB(Array(parsedValue).fill(""));
            setResults(null);
            setError("");
        } else {
            // If invalid size or empty, reset matrices
            setMatrixA([]);
            setMatrixB([]);
            setResults(null);
            setError("");
        }
    };

    // Handle changes in Matrix A
    const handleMatrixAChange = (row, col, value) => {
        const newMatrixA = matrixA.map((r, rowIndex) =>
            rowIndex === row
                ? r.map((cell, colIndex) => (colIndex === col ? (value === "" ? "" : parseFloat(value)) : cell))
                : r
        );
        setMatrixA(newMatrixA);
    };

    // Handle changes in Vector b
    const handleMatrixBChange = (index, value) => {
        const newMatrixB = matrixB.map((cell, idx) => (idx === index ? (value === "" ? "" : parseFloat(value)) : cell));
        setMatrixB(newMatrixB);
    };

    // Handle pivot type change
    const handlePivotTypeChange = (e) => {
        setPivotType(e.target.value);
    };

    // Validation before submission
    const validateForm = () => {
        if (!size || !matrixA.length || !matrixB.length) {
            setError("All fields are required.");
            return false;
        }

        // Check if Matrix A is square
        if (matrixA.length !== matrixA[0].length) {
            setError("Matrix A must be square.");
            return false;
        }

        // Check if Matrix A and Vector b have matching sizes
        if (matrixA.length !== matrixB.length) {
            setError("The size of Matrix A must match the size of Vector b.");
            return false;
        }

        // Validate that all entries in Matrix A and Vector b are numbers
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (matrixA[i][j] === "" || isNaN(matrixA[i][j])) {
                    setError(`All entries in Matrix A must be valid numbers. Error at A[${i + 1}][${j + 1}].`);
                    return false;
                }
            }
            if (matrixB[i] === "" || isNaN(matrixB[i])) {
                setError(`All entries in Vector b must be valid numbers. Error at b[${i + 1}].`);
                return false;
            }
        }

        setError("");
        return true;
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);
        setError("");
        setResults(null);

        // Determine the endpoint based on pivot type
        let endpoint = "/gaussian_elimination";
        if (pivotType === "partial") {
            endpoint = "/partial_pivoting";
        } else if (pivotType === "total") {
            endpoint = "/total_pivoting";
        }

        const requestData = {
            A: matrixA,
            b: matrixB,
        };

        console.log("Sending data to endpoint:", endpoint);
        console.log("Request data:", requestData);

        try {
            const data = await post(endpoint, requestData); // Replace with your actual endpoints
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

    // Populate test values
    const handleTestValues = () => {
        const testMatrixA = [
            [2, -1, 1],
            [1, 3, 2],
            [3, 2, 1],
        ];
        const testMatrixB = [8, 13, 10];

        setSize("3");
        setMatrixA(testMatrixA);
        setMatrixB(testMatrixB);
        setPivotType("none"); // Default pivot type
        setResults(null);
        setError("");
    };

    // Reset the form
    const handleReset = () => {
        setSize("");
        setMatrixA([]);
        setMatrixB([]);
        setPivotType("none");
        setResults(null);
        setError("");
    };

    // Render the component
    return (
        <div className="p-8 bg-white text-purple-700 min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Gaussian Elimination</h1>

            <div className="flex space-x-4 mb-6">
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
                    min="1"
                    placeholder="Enter matrix size"
                />
            </div>

            {size > 0 && (
                <>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Matrix A</h2>
                            {matrixA.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex space-x-2 mb-2">
                                    {row.map((value, colIndex) => (
                                        <input
                                            key={`${rowIndex}-${colIndex}`}
                                            type="number"
                                            value={value}
                                            onChange={(e) =>
                                                handleMatrixAChange(rowIndex, colIndex, e.target.value)
                                            }
                                            className="border border-purple-300 rounded px-2 py-1 w-16 text-center"
                                            placeholder={`A[${rowIndex + 1}][${colIndex + 1}]`}
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
                                    className="border border-purple-300 rounded px-2 py-1 w-16 text-center mb-2"
                                    placeholder={`b[${rowIndex + 1}]`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="pivotType" className="block text-lg font-semibold mb-2">
                            Pivoting Type:
                        </label>
                        <select
                            id="pivotType"
                            value={pivotType}
                            onChange={handlePivotTypeChange}
                            className="border border-purple-300 rounded px-4 py-2 w-full"
                        >
                            <option value="none">None</option>
                            <option value="partial">Partial Pivoting</option>
                            <option value="total">Total Pivoting</option>
                        </select>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className={`mt-6 bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded ${
                            loading ? "cursor-not-allowed opacity-50" : ""
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </>
            )}

            {error && <p className="mt-4 text-red-500">{error}</p>}
            {loading && <p className="mt-4">Loading...</p>}

            {results && (
                <GaussianResults
                    augmentedMatrix={results.matriz_aumentada}
                    solutions={results.soluciones}
                />
            )}
        </div>
    )
}
