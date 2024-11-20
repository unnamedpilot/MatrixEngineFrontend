import { useState } from "react";
import { useApi } from "../hooks/useApi";
import MatrixRenderer from "../components/MatrixRenderer";
import GaussSeidelResults from "../components/GaussSeidelResults.jsx";

export default function GaussSeidel() {
    const [size, setSize] = useState(""); // Matrix size
    const [matrixA, setMatrixA] = useState([]); // Matrix A
    const [matrixB, setMatrixB] = useState([]); // Vector b
    const [initialX, setInitialX] = useState([]); // Initial vector x0
    const [tolerance, setTolerance] = useState(""); // Tolerance
    const [maxIterations, setMaxIterations] = useState(""); // Max iterations
    const [results, setResults] = useState(null); // Results
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { post } = useApi();

    const handleSizeChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setSize(value);
            setMatrixA(Array(value).fill(null).map(() => Array(value).fill("")));
            setMatrixB(Array(value).fill(""));
            setInitialX(Array(value).fill(""));
            setResults(null);
            setError("");
        }
    };

    const handleMatrixChange = (matrix, setMatrix, row, col, value) => {
        const newMatrix = [...matrix];
        newMatrix[row][col] = value === "" ? "" : parseFloat(value);
        setMatrix(newMatrix);
    };

    const handleVectorChange = (vector, setVector, index, value) => {
        const newVector = [...vector];
        newVector[index] = value === "" ? "" : parseFloat(value);
        setVector(newVector);
    };

    const handleSubmit = async () => {
        if (
            !matrixA.length ||
            !matrixB.length ||
            !initialX.length ||
            !tolerance ||
            !maxIterations
        ) {
            setError("All fields are required.");
            return;
        }

        if (matrixA.length !== matrixA[0].length) {
            setError("Matrix A must be square.");
            return;
        }

        if (matrixA.length !== matrixB.length || matrixA.length !== initialX.length) {
            setError("The size of Matrix A must match the size of Vector b and Initial X.");
            return;
        }

        const requestData = {
            A: matrixA,
            b: matrixB,
            x0: initialX,
            tol: parseFloat(tolerance),
            niter: parseInt(maxIterations, 10),
        };

        setError("");
        setLoading(true);
        setResults(null);

        try {
            const response = await post("/gauss_seidel", requestData);
            setResults(response.result);
        } catch (err) {
            setError(err.message || "An error occurred while processing your request.");
        } finally {
            setLoading(false);
        }
    };

    const handleTestValues = () => {
        const testMatrixA = [
            [4, 1, 2],
            [3, 5, 1],
            [1, 1, 3],
        ];
        const testMatrixB = [4, 7, 3];
        const testInitialX = ['0', '0', '0']; // Vector inicial

        setSize(3);

        // Asegúrate de que los datos sean correctamente formateados
        setMatrixA(testMatrixA.map((row) => [...row]));
        setMatrixB([...testMatrixB]);
        setInitialX([...testInitialX]); // Aquí está la corrección

        setTolerance(0.01);
        setMaxIterations(50);
        setResults(null);
        setError("");
    };



    const handleReset = () => {
        setSize("");
        setMatrixA([]);
        setMatrixB([]);
        setInitialX([]);
        setTolerance("");
        setMaxIterations("");
        setResults(null);
        setError("");
    };

    return (
        <div className="p-8 bg-white text-purple-700 min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Gauss-Seidel Method</h1>

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
                />
            </div>

            {size > 0 && (
                <>
                    <div className="grid grid-cols-2 gap-8 mb-6">
                        <MatrixRenderer
                            matrix={matrixA}
                            label="Matrix A"
                            onMatrixChange={(row, col, value) =>
                                handleMatrixChange(matrixA, setMatrixA, row, col, value)
                            }
                        />
                        <MatrixRenderer
                            matrix={matrixB}
                            label="Vector b"
                            isVector={true}
                            onMatrixChange={(row, _, value) =>
                                handleVectorChange(matrixB, setMatrixB, row, value)
                            }
                        />
                    </div>

                    <MatrixRenderer
                        matrix={initialX}
                        label="Initial Vector X"
                        isVector={true}
                        onMatrixChange={(row, _, value) =>
                            handleVectorChange(initialX, setInitialX, row, value)
                        }
                    />
                </>
            )}

            <div className="mb-6">
                <label htmlFor="tolerance" className="block text-lg font-semibold mb-2">
                    Tolerance:
                </label>
                <input
                    type="number"
                    id="tolerance"
                    value={tolerance}
                    onChange={(e) => setTolerance(e.target.value)}
                    className="border border-purple-300 rounded px-4 py-2 w-full"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="maxIterations" className="block text-lg font-semibold mb-2">
                    Max Iterations:
                </label>
                <input
                    type="number"
                    id="maxIterations"
                    value={maxIterations}
                    onChange={(e) => setMaxIterations(e.target.value)}
                    className="border border-purple-300 rounded px-4 py-2 w-full"
                />
            </div>

            <button
                onClick={handleSubmit}
                className="mt-6 bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded"
            >
                Submit
            </button>

            {error && <p className="mt-4 text-red-500">{error}</p>}
            {loading && <p className="mt-4">Loading...</p>}

            {results && <GaussSeidelResults results={results} />}

        </div>
    );
}
