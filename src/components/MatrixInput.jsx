import React, { useState } from "react";

export default function MatrixInput({ size, onSizeChange, matrixA, onMatrixAChange, matrixB, onMatrixBChange }) {
    const handleSizeChange = (e) => {
        const value = e.target.value;

        // Validar el tamaño de la matriz (entre 1 y 8)
        if (value === "" || (parseInt(value, 10) > 0 && parseInt(value, 10) <= 8)) {
            onSizeChange(value);

            const sizeAsNumber = parseInt(value, 10);
            if (!isNaN(sizeAsNumber)) {
                // Actualizar Matrix A
                const updatedMatrixA = Array(sizeAsNumber)
                    .fill(null)
                    .map((_, i) =>
                        Array(sizeAsNumber).fill("").map((_, j) => (matrixA[i]?.[j] || ""))
                    );
                onMatrixAChange(updatedMatrixA);

                // Actualizar Vector B
                const updatedMatrixB = Array(sizeAsNumber).fill("").map((_, i) => (matrixB[i] || ""));
                onMatrixBChange(updatedMatrixB);
            } else {
                onMatrixAChange([]);
                onMatrixBChange([]);
            }
        }
    };

    const handleMatrixAChange = (row, col, value) => {
        const updatedMatrixA = matrixA.map((r) => [...r]);
        updatedMatrixA[row][col] = value;
        onMatrixAChange(updatedMatrixA);
    };

    const handleMatrixBChange = (row, value) => {
        const updatedMatrixB = [...matrixB];
        updatedMatrixB[row] = value;
        onMatrixBChange(updatedMatrixB);
    };

    return (
        <div>
            <label className="block text-lg font-semibold mb-2">Matrix size (n x n):</label>
            <input
                type="number"
                value={size}
                onChange={handleSizeChange}
                max="8"
                className="border border-purple-300 rounded px-4 py-2 w-full mb-4"
            />

            {parseInt(size, 10) > 0 && (
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Matrix A</h2>
                        {matrixA.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex space-x-2">
                                {row.map((value, colIndex) => (
                                    <input
                                        key={`${rowIndex}-${colIndex}`}
                                        type="number"
                                        value={value || ""}
                                        onChange={(e) => handleMatrixAChange(rowIndex, colIndex, e.target.value)}
                                        className="border border-purple-300 rounded px-2 py-1 w-16 text-center"
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Vector b</h2>
                        {matrixB.map((value, rowIndex) => (
                            <input
                                key={`b-${rowIndex}`}
                                type="number"
                                value={value || ""}
                                onChange={(e) => handleMatrixBChange(rowIndex, e.target.value)}
                                className="border border-purple-300 rounded px-2 py-1 w-16 text-center"
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
