// components/RootFindingForm.jsx
import React from "react";

export default function RootFindingForm({
                                            formData,
                                            onChange,
                                            onSubmit,
                                            loading,
                                            error,
                                            inputs,
                                            buttons,
                                        }) {
    return (
        <form onSubmit={onSubmit} className="relative space-y-4 mb-8">
            {/* Botones */}
            {buttons && (
                <div className="flex space-x-4 mb-4">
                    {buttons.map((btn, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={btn.onClick}
                            className={btn.className}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Campos de Entrada */}
            {inputs.map((input) => (
                <div key={input.name} className="mb-4">
                    <label htmlFor={input.name} className="block text-lg font-semibold mb-2">
                        {input.label}
                    </label>
                    <input
                        type={input.type}
                        id={input.name}
                        name={input.name}
                        value={formData[input.name]}
                        onChange={(e) => onChange(input.name, e.target.value)}
                        className="border border-purple-300 rounded px-4 py-2 w-full"
                        placeholder={input.placeholder}
                    />
                </div>
            ))}

            {/* Mensaje de Error General */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Botón de Envío */}
            <button
                type="submit"
                className={`mt-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
            >
                {loading ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
}
