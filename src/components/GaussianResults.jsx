const GaussianResults = ({ augmentedMatrix, solutions }) => (
    <div>
        <h2 className="text-2xl font-bold mt-8 mb-4">Augmented Matrix</h2>
        <ResultsRenderer matrix={augmentedMatrix} />

        <h2 className="text-2xl font-bold mt-8 mb-4">Solutions</h2>
        <ul>
            {solutions.map((sol, index) => (
                <li key={index} className="text-lg">
                    <span className="font-bold">{sol.variable}:</span>{" "}
                    {sol.valor.toFixed(6)}
                </li>
            ))}
        </ul>
    </div>
);

export default GaussianResults;
