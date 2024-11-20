// pages/Jacobi.jsx
import { useState } from "react";
import { useApi } from "../hooks/useApi";
import MatrixInput from "../components/MatrixInput";
import JacobiResultsRenderer from "../components/JacobiResultsRenderer.jsx";

export default function Jacobi() {
    const [size, setSize] = useState(""); // Tamaño de la matriz (como cadena)
    const [matrixA, setMatrixA] = useState([]); // Matriz A
    const [vectorB, setVectorB] = useState([]); // Vector b
    const [initialX, setInitialX] = useState([]); // Vector inicial x0
    const [tolerance, setTolerance] = useState(""); // Tolerancia
    const [maxIterations, setMaxIterations] = useState(""); // Máximo número de iteraciones
    const [results, setResults] = useState(null); // Resultados
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { post } = useApi();

    // Manejar cambios en el tamaño de la matriz
    const handleSizeChange = (e) => {
        const value = e.target.value.trim();
        setSize(value);

        if (value === "") {
            // Si el valor está vacío, reiniciar matrices
            setMatrixA([]);
            setVectorB([]);
            setInitialX([]);
            setResults(null);
            setError("");
            return;
        }

        const sizeValue = parseInt(value, 10);

        if (!isNaN(sizeValue) && sizeValue > 0) {
            // Inicializar Matrix A como una matriz 2D con cadenas vacías
            const newMatrixA = Array.from({ length: sizeValue }, () => Array(sizeValue).fill(""));
            setMatrixA(newMatrixA);

            // Inicializar Vector b y Vector inicial X como arrays de cadenas vacías
            setVectorB(Array(sizeValue).fill(""));
            setInitialX(Array(sizeValue).fill(""));
            setResults(null);
            setError("");
        } else {
            // Si el tamaño es inválido, reiniciar matrices
            setMatrixA([]);
            setVectorB([]);
            setInitialX([]);
            setResults(null);
            setError("");
        }
    };

    // Manejar cambios en Matrix A
    const handleMatrixAChange = (row, col, value) => {
        const newMatrixA = matrixA.map((r, rowIndex) =>
            rowIndex === row
                ? r.map((cell, colIndex) => (colIndex === col ? (value === "" ? "" : value) : cell))
                : r
        );
        setMatrixA(newMatrixA);
    };

    // Manejar cambios en Vector b
    const handleVectorBChange = (index, value) => {
        const newVectorB = vectorB.map((cell, idx) => (idx === index ? (value === "" ? "" : value) : cell));
        setVectorB(newVectorB);
    };

    // Manejar cambios en Vector inicial X
    const handleInitialXChange = (index, value) => {
        const newInitialX = initialX.map((cell, idx) => (idx === index ? (value === "" ? "" : value) : cell));
        setInitialX(newInitialX);
    };

    // Manejar el envío del formulario
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

        if (!tolerance || isNaN(parseFloat(tolerance)) || parseFloat(tolerance) <= 0) {
            setError("Please provide a valid positive tolerance.");
            return;
        }

        if (!maxIterations || isNaN(parseInt(maxIterations, 10)) || parseInt(maxIterations, 10) <= 0) {
            setError("Please provide a valid positive number for maximum iterations.");
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
            setResults(response.results); // Asumiendo que la respuesta tiene la estructura { results: { ... } }
            console.log("API response:", response);
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

    // Manejar valores de prueba
    const handleTestValues = () => {
        const testMatrixA = [
            [4, -1, 0, 0],
            [-1, 4, -1, 0],
            [0, -1, 4, -1],
            [0, 0, -1, 3],
        ];
        const testVectorB = [15, 10, 10, 10];
        const testInitialX = [0, 0, 0, 0];

        // Convertir a cadenas para los campos de entrada
        const stringMatrixA = testMatrixA.map((row) => row.map((value) => value.toString()));
        const stringVectorB = testVectorB.map((value) => value.toString());
        const stringInitialX = testInitialX.map((value) => value.toString());

        setSize("4");
        setMatrixA(stringMatrixA);
        setVectorB(stringVectorB);
        setInitialX(stringInitialX);
        setTolerance("0.001");
        setMaxIterations("25");
        setResults(null);
        setError("");
    };

    // Manejar el reinicio del formulario
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
                onMatrixAChange={handleMatrixAChange}
                matrixB={vectorB}
                onMatrixBChange={handleVectorBChange}
                initialX={initialX}
                onInitialXChange={handleInitialXChange}
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
                    min="0.000001"
                    step="0.000001"
                    placeholder="Enter tolerance (e.g., 0.001)"
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
                    min="1"
                    step="1"
                    placeholder="Enter maximum iterations (e.g., 25)"
                />
            </div>

            <button
                onClick={handleSubmit}
                className={`mt-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
            >
                {loading ? "Submitting..." : "Submit"}
            </button>

            {error && <p className="mt-4 text-red-500">{error}</p>}
            {loading && <p className="mt-4">Loading...</p>}

            {results && <JacobiResultsRenderer results={results} />}
        </div>
    )
}
