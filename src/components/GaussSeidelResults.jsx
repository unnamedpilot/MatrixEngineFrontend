import React from "react";
import MatrixDisplay from "./MatrixDisplay";
import VectorDisplay from "./VectorDisplay";

export default function GaussSeidelResults({ results }) {
    if (!results) return null;

    return (
        <div>
            <h2 className="text-2xl font-bold mt-8">Gauss-Seidel Results</h2>

            {/* Transition Matrix (T) */}
            {results.transition_matrix && (
                <>
                    <h3 className="text-xl font-semibold mt-4">Transition Matrix (T)</h3>
                    <MatrixDisplay matrix={results.transition_matrix} />
                </>
            )}

            {/* Coefficient Matrix (C) */}
            {results.coefficient_matrix && (
                <>
                    <h3 className="text-xl font-semibold mt-4">Coefficient Matrix (C)</h3>
                    <MatrixDisplay matrix={results.coefficient_matrix} />
                </>
            )}

            {/* Spectral Radius */}
            {results.spectral_radius && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">Spectral Radius:</h3>
                    <p>{results.spectral_radius.toFixed(6)}</p>
                </div>
            )}

            {/* Iterations */}
            {results.iterations && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">Iterations:</h3>
                    <ul className="list-disc list-inside">
                        {results.iterations.map((iteration, index) => (
                            <li key={index}>
                                <strong>Step {iteration.step}</strong>:{" "}
                                <VectorDisplay vector={iteration.x} /> | Error:{" "}
                                {iteration.error.toFixed(6)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Convergence */}
            {typeof results.converges === "boolean" && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">Convergence:</h3>
                    <p>{results.converges ? "Yes, the method converges." : "No, the method does not converge."}</p>
                </div>
            )}
        </div>
    );
}
