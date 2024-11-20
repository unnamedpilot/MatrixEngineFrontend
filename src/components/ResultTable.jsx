import React from "react";

export default function ResultTable({ results }) {
    if (!results || !results.iteraciones || results.iteraciones.length === 0) {
        return <p>No results available.</p>;
    }

    // Extract keys dynamically from the first iteration
    const columns = Object.keys(results.iteraciones[0]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            <table className="table-auto w-full border-collapse border border-purple-300">
                <thead>
                <tr>
                    {columns.map((key) => (
                        <th
                            key={key}
                            className="border border-purple-300 px-4 py-2 capitalize"
                        >
                            {key.replace("_", " ")}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {results.iteraciones.map((iter, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((key) => (
                            <td
                                key={`${rowIndex}-${key}`}
                                className="border border-purple-300 px-4 py-2"
                            >
                                {iter[key]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            {results.mensaje && (
                <p className="mt-4 text-lg font-semibold">{results.mensaje}</p>
            )}
        </div>
    );
}
