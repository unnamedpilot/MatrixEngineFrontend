export default function MathInput({ value, onChange, label }) {
    return (
        <div className="mb-4">
            {label && <label className="block text-lg font-semibold mb-2">{label}</label>}
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border border-purple-300 rounded px-4 py-2 w-full"
                placeholder="Enter value"
            />
        </div>
    );
}
