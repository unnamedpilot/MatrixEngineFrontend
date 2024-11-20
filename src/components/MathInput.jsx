// components/MathInput.jsx
import React from "react";

export default function MathInput({ value, onChange, label, error }) {
    return (
        <div>
            <label htmlFor="math-input" className="block text-lg font-semibold">
                {label}
            </label>
            <textarea
                id="math-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                    error ? "border-red-500" : "border-purple-300"
                }`}
                placeholder="Enter your mathematical function here..."
                rows={3}
            ></textarea>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
