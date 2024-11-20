import { useState } from "react";
import { useApi } from "../hooks/useApi";

export default function Vandermonde() {
    const [xValues, setXValues] = useState([]);
    const [yValues, setYValues] = useState([]);
    const [size, setSize] = useState("");
    const [results, setResults] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { post } = useApi();

    const handleSizeChange = (e) => {
        const value = e.target.value;

        // Permitir valores vacíos o números positivos
        if (value === "" || /^[1-9]\d*$/.test(value)) {
            setSize(value);

            // Si el tamaño es válido, actualizar los arreglos X e Y
            if (value !== "") {
                const numericSize = parseInt(value, 10);
                setXValues(Array(numericSize).fill(""));
                setYValues(Array(numericSize).fill(""));
            } else {
                // Vaciar los valores si el tamaño es inválido
                setXValues([]);
                setYValues([]);
            }

            setResults(null);
            setError("");
        }
    };


    const handleXChange = (index, value) => {
        const newXValues = [...xValues];
        newXValues[index] = parseFloat(value) || "";
        setXValues(newXValues);
    };

    const handleYChange = (index, value) => {
        const newYValues = [...yValues];
        newYValues[index] = parseFloat(value) || "";
        setYValues(newYValues);
    };

    const handleSubmit = async () => {
        if (xValues.includes("") || yValues.includes("")) {
            setError("Please fill all values for X and Y.");
            return;
        }

        setError("");
        setLoading(true);
        setResults(null);

        const requestData = { x: xValues, y: yValues };

        try {
            const response = await post("/vandermonde", requestData);
            console.log("Response:", response);
            setResults(response)
        } catch (error) {
            console.error("Error:", error.message);
            setError(error.message); // Mostrar el mensaje al usuario
        } finally {
            setLoading(false);
        }
    };

    const handleTestValues = () => {
        setSize(3);
        setXValues([1, 2, 3]);
        setYValues([4, 5, 6]);
        setResults(null);
        setError("");
    };

    const handleReset = () => {
        setSize("");
        setXValues([]);
        setYValues([]);
        setResults(null);
        setError("");
    };

    return (
        <div className="p-8 bg-white text-purple-700 min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Vandermonde Interpolation</h1>

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
                    Number of Points:
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
                        <h2 className="text-xl font-semibold mb-4">X Values</h2>
                        {xValues.map((value, index) => (
                            <input
                                key={`x-${index}`}
                                type="number"
                                value={value}
                                onChange={(e) => handleXChange(index, e.target.value)}
                                className="border border-purple-300 rounded px-2 py-1 w-16 text-center mb-2"
                            />
                        ))}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Y Values</h2>
                        {yValues.map((value, index) => (
                            <input
                                key={`y-${index}`}
                                type="number"
                                value={value}
                                onChange={(e) => handleYChange(index, e.target.value)}
                                className="border border-purple-300 rounded px-2 py-1 w-16 text-center mb-2"
                            />
                        ))}
                    </div>
                </div>
            )}

            {size > 0 && (
                <button
                    onClick={handleSubmit}
                    className={`mt-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                >
                    Submit
                </button>
            )}

            {error && <p className="mt-4 text-red-500">{error}</p>}
            {loading && <p className="mt-4">Loading...</p>}

            {results && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Results</h2>
                    <p className="mb-4">
                        <strong>Polynomial:</strong> {results[0]}
                    </p>
                    <h3 className="text-xl font-semibold mb-4">Coefficients:</h3>
                    <div className="p-4 bg-gray-100 rounded shadow">
                        {results[1].map((coef, index) => (
                            <p key={index} className="mb-2">
                                Coefficient of \( x^{index} \): {coef.toFixed(6)}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
