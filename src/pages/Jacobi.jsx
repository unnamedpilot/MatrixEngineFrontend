import { useState } from "react";
import { useApi } from "../hooks/useApi";
import MatrixInput from "../components/MatrixInput";
import ResultsRenderer from "../components/ResultsRenderer";
import JacobiResultsRenderer from "../components/JacobiResultsRenderer.jsx";

export default function Jacobi() {
    const [size, setSize] = useState(""); // Tamaño de la matriz
    const [matrixA, setMatrixA] = useState([]); // Matriz A
    const [vectorB, setVectorB] = useState([]); // Vector b
    const [initialX, setInitialX] = useState([]); // Vector inicial x0
    const [tolerance, setTolerance] = useState(""); // Tolerancia
    const [maxIterations, setMaxIterations] = useState(""); // Máximo número de iteraciones
    const [results, setResults] = useState(null); // Resultados
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { post } = useApi();

    // Control del tamaño, evitando problemas al borrar el primer dígito
    const handleSizeChange = (value) => {
        if (value === "") {
            setSize("");
            setMatrixA([]);
            setVectorB([]);
            setInitialX([]);
            return;
        }

        const sizeValue = parseInt(value, 10);
        if (!isNaN(sizeValue) && sizeValue > 0) {
            setSize(sizeValue);
            setMatrixA(Array(sizeValue).fill(Array(sizeValue).fill("")));
            setVectorB(Array(sizeValue).fill(""));
            setInitialX(Array(sizeValue).fill(""));
            setResults(null);
            setError("");
        }
    };

    const handleSubmit = async () => {
        // Convertir los valores a números
        const numericMatrixA = matrixA.map((row) => row.map((value) => parseFloat(value || 0)));
        const numericVectorB = vectorB.map((value) => parseFloat(value || 0));
        const numericInitialX = initialX.map((value) => parseFloat(value || 0));

        // Validaciones
        if (!size || numericMatrixA.length === 0 || numericVectorB.length === 0 || numericInitialX.length === 0) {
            setError("Please fill all required fields.");
            return;
        }

        if (numericMatrixA.length !== numericMatrixA[0].length) {
            setError("Matrix A must be square.");
            return;
        }

        if (numericMatrixA.length !== numericVectorB.length || numericMatrixA.length !== numericInitialX.length) {
            setError("The size of Matrix A must match the size of Vector b and Initial X.");
            return;
        }

        if (!tolerance || !maxIterations) {
            setError("Please provide the tolerance and maximum iterations.");
            return;
        }

        const requestData = {
            matrix_a: numericMatrixA,
            vector_b: numericVectorB,
            x0: numericInitialX,
            tol: parseFloat(tolerance),
            niter: parseInt(maxIterations, 10),
        };

        setError("");
        setLoading(true);
        setResults(null);

        try {
            const response = await post("/jacobi", requestData);
            setResults(response);
            console.log(results);
        } catch (err) {
            setError(err.message || "An error occurred while processing your request.");
        } finally {
            setLoading(false);
        }
    };

    const handleTestValues = () => {
        const testMatrixA = [
            [4, -1, 0, 0],
            [-1, 4, -1, 0],
            [0, -1, 4, -1],
            [0, 0, -1, 3],
        ];
        const testVectorB = [15, 10, 10, 10];
        const testInitialX = [0, 0, 0, 0];

        // Los ceros se gestionan como strings para evitar problemas con `falsy`
        setSize(4);
        setMatrixA(
            testMatrixA.map((row) => row.map((value) => (value === 0 ? "0" : value.toString())))
        );
        setVectorB(testVectorB.map((value) => (value === 0 ? "0" : value.toString())));
        setInitialX(testInitialX.map((value) => (value === 0 ? "0" : value.toString())));
        setTolerance(0.0001);
        setMaxIterations(25);
        setResults(null);
        setError("");
    };

    const handleReset = () => {
        setSize("");
        setMatrixA([]);
        setVectorB([]);
        setInitialX([]);
        setTolerance("");
        setMaxIterations("");
        setResults(null);
        setError("");
    };

    return (
        <div className="p-8 bg-white text-purple-700 min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Jacobi Method</h1>

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

            <MatrixInput
                size={size}
                onSizeChange={handleSizeChange}
                matrixA={matrixA}
                onMatrixAChange={setMatrixA}
                matrixB={vectorB}
                onMatrixBChange={setVectorB}
                initialX={initialX}
                onInitialXChange={setInitialX}
            />

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
                className={`mt-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
            >
                Submit
            </button>

            {error && <p className="mt-4 text-red-500">{error}</p>}
            {loading && <p className="mt-4">Loading...</p>}

            {results && <JacobiResultsRenderer results={results.result} />}
        </div>
    );
}
