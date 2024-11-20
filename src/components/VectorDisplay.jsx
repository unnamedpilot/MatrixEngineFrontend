import React from "react";

export default function VectorDisplay({ vector }) {
    return (
        <div className="p-4 bg-gray-100 rounded shadow-md flex">
            {vector.map((value, index) => (
                <div
                    key={index}
                    className="w-20 h-10 flex items-center justify-center border border-gray-300"
                >
                    {value.toFixed(6)}
                </div>
            ))}
        </div>
    );
}
