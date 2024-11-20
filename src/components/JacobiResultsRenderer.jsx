// components/JacobiResultsRenderer.jsx
import React from "react";

export default function JacobiResultsRenderer({ results }) {
    console.log("JacobiResultsRenderer received results:", results);

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Results</h2>

            {/* Transition Matrix */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Transition Matrix</h3>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                    <tr>
                        {results.transition_matrix[0].map((_, colIndex) => (
                            <th
                                key={colIndex}
                                className="border border-gray-300 px-4 py-2"
                            >
                                {`T[${colIndex + 1}]`}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {results.transition_matrix.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((value, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="border border-gray-300 px-4 py-2 text-center"
                                >
                                    {value}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Coefficient Matrix */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Coefficient Matrix</h3>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">C</th>
                    </tr>
                    </thead>
                    <tbody>
                    {results.coefficient_matrix.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((value, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="border border-gray-300 px-4 py-2 text-center"
                                >
                                    {value}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Spectral Radius y Convergencia */}
            <div className="mb-6">
                <p className="text-lg">
                    <strong>Spectral Radius:</strong> {results.spectral_radius.toFixed(6)}
                </p>
                <p className="text-lg">
                    <strong>Converges:</strong> {results.converges ? "Yes" : "No"}
                </p>
            </div>

            {/* Iteraciones */}
            <div>
                <h3 className="text-xl font-semibold mb-2">Iterations</h3>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Step</th>
                        <th className="border border-gray-300 px-4 py-2">x</th>
                        <th className="border border-gray-300 px-4 py-2">Error</th>
                    </tr>
                    </thead>
                    <tbody>
                    {results.iterations.map((iteration) => (
                        <tr key={iteration.step}>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                {iteration.step}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {iteration.x.map((xi, idx) => (
                                    <span key={idx}>
                                            x<sub>{idx + 1}</sub> = {xi.toFixed(6)}{" "}
                                        </span>
                                ))}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                {iteration.error.toFixed(6)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
