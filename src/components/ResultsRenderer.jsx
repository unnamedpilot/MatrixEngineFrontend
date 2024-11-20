import React from "react";
import MatrixDisplay from "./MatrixDisplay";
import VectorDisplay from "./VectorDisplay";

export default function ResultsRenderer({ results }) {
    if (!results) return null;

    return (
        <div>
            <h2 className="text-2xl font-bold mt-8">Results</h2>

            {/* Mostrar matrices L y U */}
            {results.L && (
                <>
                    <h3 className="text-xl font-semibold mt-4">Matrix L</h3>
                    <MatrixDisplay matrix={results.L} />
                </>
            )}
            {results.U && (
                <>
                    <h3 className="text-xl font-semibold mt-4">Matrix U</h3>
                    <MatrixDisplay matrix={results.U} />
                </>
            )}

            {/* Mostrar solución */}
            {results.x && (
                <>
                    <h3 className="text-xl font-semibold mt-4">Solution (x)</h3>
                    <VectorDisplay vector={results.x} />
                </>
            )}
        </div>
    );
}
