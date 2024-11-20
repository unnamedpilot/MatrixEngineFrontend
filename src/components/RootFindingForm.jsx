import MathInput from "./MathInput.jsx";

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
            {/* Buttons */}
            {buttons && (
                <div className="absolute right-0 -top-12 flex space-x-4">
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

            {/* Input Fields */}
            {inputs.map((input) => {
                if (input.type === "math") {
                    return (
                        <MathInput
                            key={input.name}
                            value={formData[input.name]}
                            onChange={(value) => onChange(input.name, value)}
                            label={input.label}
                        />
                    );
                }

                if (input.type === "select") {
                    // Render a select dropdown
                    return (
                        <div key={input.name}>
                            <label htmlFor={input.name} className="block text-lg font-semibold">
                                {input.label}
                            </label>
                            <select
                                id={input.name}
                                name={input.name}
                                value={formData[input.name]}
                                onChange={(e) => onChange(input.name, e.target.value)}
                                className="border border-purple-300 rounded px-4 py-2 w-full"
                            >
                                <option value="absoluto">Absolute</option>
                                <option value="relativo">Relative</option>
                            </select>
                        </div>
                    );
                }

                // Default input type
                return (
                    <div key={input.name}>
                        <label htmlFor={input.name} className="block text-lg font-semibold">
                            {input.label}
                        </label>
                        <input
                            type={input.type || "text"}
                            id={input.name}
                            name={input.name}
                            value={formData[input.name]}
                            onChange={(e) => onChange(input.name, e.target.value)}
                            className="border border-purple-300 rounded px-4 py-2 w-full"
                            placeholder={input.placeholder || ""}
                        />
                    </div>
                );
            })}

            {/* Error Message */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Submit Button */}
            <button
                type="submit"
                className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                disabled={loading}
            >
                {loading ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
}
