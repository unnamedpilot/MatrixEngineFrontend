import React from "react";

export default function MatrixDisplay({ matrix }) {
    return (
        <div className="p-4 bg-gray-100 rounded shadow-md">
            {matrix.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((value, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className="w-20 h-10 flex items-center justify-center border border-gray-300"
                        >
                            {value.toFixed(2)}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
