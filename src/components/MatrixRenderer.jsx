export default function MatrixRenderer({ matrix, label, isVector = false, onMatrixChange }) {
    if (!Array.isArray(matrix)) {
        console.error("MatrixRenderer: matrix is not an array", matrix);
        return <p>Error: Invalid matrix data.</p>;
    }

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">{label}</h3>
            {matrix.map((row, rowIndex) => (
                <div key={rowIndex} className="flex space-x-2 mb-2">
                    {isVector ? (
                        <input
                            type="number"
                            value={row || ""} // Para vectores unidimensionales
                            onChange={(e) => onMatrixChange(rowIndex, null, e.target.value)}
                            className="border border-purple-300 rounded px-2 py-1 w-16 text-center"
                        />
                    ) : (
                        row.map((value, colIndex) => (
                            <input
                                key={`${rowIndex}-${colIndex}`}
                                type="number"
                                value={value || ""}
                                onChange={(e) =>
                                    onMatrixChange(rowIndex, colIndex, e.target.value)
                                }
                                className="border border-purple-300 rounded px-2 py-1 w-16 text-center"
                            />
                        ))
                    )}
                </div>
            ))}
        </div>
    );
}
