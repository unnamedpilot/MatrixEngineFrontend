import MatrixRenderer from "./MatrixRenderer.jsx";

const GaussianResults = ({ result }) => {
        if (!result) return null;

        const { matriz_aumentada, soluciones } = result;

        if (!matriz_aumentada || !soluciones) {
                console.error("GaussianResults: Missing required data in result", result);
                return <p>Error: Results data is incomplete or malformed.</p>;
        }

        return (
            <div>
                    {/* Mostrar la matriz aumentada */}
                    <h2 className="text-2xl font-bold mt-8 mb-4">Augmented Matrix</h2>
                    <MatrixRenderer matrix={matriz_aumentada} label="Augmented Matrix" />

                    {/* Mostrar las soluciones */}
                    <h2 className="text-2xl font-bold mt-8 mb-4">Solutions</h2>
                    <ul>
                            {soluciones.map((sol, index) => (
                                <li key={index} className="text-lg">
                                        <span className="font-bold">{sol.variable}:</span>{" "}
                                        {sol.valor.toFixed(6)}
                                </li>
                            ))}
                    </ul>
            </div>
        );
};

export default GaussianResults;
