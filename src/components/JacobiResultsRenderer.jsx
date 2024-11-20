import React from "react";
import MatrixRenderer from "../components/MatrixRenderer";

export default function JacobiResultsRenderer({ results }) {
    if (!results) return null;

    const { transition_matrix, coefficient_matrix, spectral_radius, iterations, converges } =
        results;

    return (
        <div>
            <h2 className="text-2xl font-bold mt-8">Results</h2>

            {/* Matrices de resultados */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <MatrixRenderer
                    matrix={transition_matrix}
                    label="Transition Matrix (T)"
                    isVector={false}
                />
                <MatrixRenderer
                    matrix={coefficient_matrix}
                    label="Coefficient Matrix (C)"
                    isVector={false}
                />
            </div>

            {/* Espectro y convergencia */}
            <div className="mb-4">
                <h3 className="text-xl font-semibold">Spectral Radius</h3>
                <p>{spectral_radius.toFixed(6)}</p>
            </div>
            <div className="mb-4">
                <h3 className="text-xl font-semibold">Convergence</h3>
                <p>{converges ? "Yes" : "No"}</p>
            </div>

            {/* Iteraciones */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold">Iterations</h3>
                <div className="space-y-4">
                    {iterations.map((iteration) => (
                        <div key={iteration.step} className="border-b pb-2">
                            <h4 className="font-semibold">Step {iteration.step}</h4>
                            <p>
                                <strong>X:</strong>{" "}
                                {iteration.x.map((value) => value.toFixed(6)).join(", ")}
                            </p>
                            <p>
                                <strong>Error:</strong> {iteration.error.toFixed(6)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
