import React from "react";

export default function MatrixInput({
                                        label,
                                        matrix,
                                        onChange,
                                        onKeyDown,
                                        refs,
                                        type,
                                    }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">{label}</h2>
            <div className="grid gap-2">
                {matrix.map((row, rowIndex) => (
                    <div className="flex space-x-2" key={`row-${rowIndex}`}>
                        {row.map((value, colIndex) => {
                            const currentIndex = type === "A" ? rowIndex * matrix.length + colIndex : rowIndex;
                            return (
                                <input
                                    key={`${type}-${rowIndex}-${colIndex}`}
                                    type="number"
                                    value={value}
                                    onChange={(e) => onChange(rowIndex, colIndex, e.target.value)}
                                    onKeyDown={(e) => onKeyDown(e, currentIndex)}
                                    ref={(el) => (refs.current[currentIndex] = el)}
                                    className="border border-purple-300 rounded px-2 py-1 w-16 text-center no-spin"
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
