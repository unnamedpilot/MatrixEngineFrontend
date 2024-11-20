// components/ResultTable.jsx
import React from "react";
import PropTypes from "prop-types";

export default function ResultTable({ results }) {
    const { iteraciones, raiz, mensaje } = results;

    // Verificar si iteraciones es un array
    const iteracionesArray = Array.isArray(iteraciones) ? iteraciones : [iteraciones];

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Results</h2>

            {/* Tabla de Iteraciones */}
            {iteracionesArray.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Iterations</h3>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Iteration</th>
                            <th className="border border-gray-300 px-4 py-2">x₀</th>
                            <th className="border border-gray-300 px-4 py-2">f(x₀)</th>
                            <th className="border border-gray-300 px-4 py-2">f'(x₀)</th>
                            <th className="border border-gray-300 px-4 py-2">x₁</th>
                            <th className="border border-gray-300 px-4 py-2">Error</th>
                        </tr>
                        </thead>
                        <tbody>
                        {iteracionesArray.map((iter, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {iter.iteracion || iter}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {iter.x0 || "-"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {iter.f_x0 || "-"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {iter.f_prime_x0 || "-"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {iter.x1 || "-"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {iter.error || "-"}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Raíz Encontrada y Mensaje */}
            <div className="mb-6">
                <p className="text-lg">
                    <strong>Root:</strong> {raiz || "-"}
                </p>
                <p className="text-lg">
                    <strong>Message:</strong> {mensaje || "-"}
                </p>
            </div>
        </div>
    );
}

ResultTable.propTypes = {
    results: PropTypes.shape({
        iteraciones: PropTypes.oneOfType([
            PropTypes.arrayOf(
                PropTypes.shape({
                    iteracion: PropTypes.number,
                    x0: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                    f_x0: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                    f_prime_x0: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                    x1: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                    error: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                })
            ),
            PropTypes.string
        ]),
        raiz: PropTypes.string,
        mensaje: PropTypes.string,
    }).isRequired,
};
