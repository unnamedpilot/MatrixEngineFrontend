export default function EvaluateFunctions() {
    const [functionInput, setFunctionInput] = useState("");

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-6">Evaluar Funciones</h1>
            <input
                type="text"
                value={functionInput}
                onChange={(e) => setFunctionInput(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
                placeholder="Escribe una función para evaluar (ej. x^2 + 2x + 1)"
            />
            {/* Aquí puedes añadir más lógica para evaluar la función */}
        </div>
    );
}
