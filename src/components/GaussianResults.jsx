// components/GaussianResults.jsx
import React from "react";

export default function GaussianResults({ augmentedMatrix, solutions }) {
    console.log("GaussianResults received augmentedMatrix:", augmentedMatrix);
    console.log("GaussianResults received solutions:", solutions);

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Results</h2>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Augmented Matrix</h3>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                    <tr>
                        {/* Assuming the last column is Vector b */}
                        {augmentedMatrix[0].slice(0, -1).map((_, colIndex) => (
                            <th
                                key={colIndex}
                                className="border border-gray-300 px-4 py-2"
                            >
                                {`A[${colIndex + 1}]`}
                            </th>
                        ))}
                        <th className="border border-gray-300 px-4 py-2">b</th>
                    </tr>
                    </thead>
                    <tbody>
                    {augmentedMatrix.map((row, rowIndex) => (
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

            <div>
                <h3 className="text-xl font-semibold mb-2">Solutions</h3>
                {solutions && solutions.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {solutions.map((solution, index) => (
                            <li key={index}>
                                {`${solution.variable} = ${solution.valor}`}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No solutions found.</p>
                )}
            </div>
        </div>
    );
}
