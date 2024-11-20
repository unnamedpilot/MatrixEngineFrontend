import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint: Búsqueda Incremental
app.post("/busquedas-incrementales", (req, res) => {
    const { function: func, x0, delta, maxIteraciones, tipoError } = req.body;

    if (!func || x0 === undefined || delta === undefined || !maxIteraciones || !tipoError) {
        return res.status(400).json({ error: "Missing required fields for Incremental Search." });
    }

    // Simulated response for Incremental Search
    const response = {
        iteraciones: [
            { iteracion: 1, x0: 0, x1: 0.1, f_x0: 0, f_x1: 0.0998334, error: 0.0998334 },
            { iteracion: 2, x0: 0.1, x1: 0.2, f_x0: 0.0998334, f_x1: 0.198669, error: 0.0988356 },
        ],
        mensaje: "Root found in the interval [a, b].",
    };

    res.status(200).json(response);
});

// Endpoint: Bisección
app.post("/biseccion", (req, res) => {
    const { funcion, a, b, tolerancia, maxIteraciones, tipoError } = req.body;

    if (!funcion || a === undefined || b === undefined || !tolerancia || !maxIteraciones || !tipoError) {
        return res.status(400).json({ error: "Missing required fields for Bisection Method." });
    }

    // Simulated response for Bisection
    const response = {
        iteraciones: [
            { iteracion: 1, a: 0, b: 1, xm: 0.5, f_xm: -0.106531, error: 1 },
            { iteracion: 2, a: 0.5, b: 1, xm: 0.75, f_xm: -0.277633, error: 0.333333 },
        ],
        raiz: 0.567143,
        mensaje: "Raíz encontrada con la tolerancia especificada.",
    };

    res.status(200).json(response);
});

app.post("/api/regla-falsa", (req, res) => {
    const { funcion, a, b, tolerancia, maxIteraciones, tipoError } = req.body;

    if (!funcion || a === undefined || b === undefined || !tolerancia || !maxIteraciones || !tipoError) {
        return res.status(400).json({ error: "Missing required fields for False Position Method." });
    }

    // Simulated response for False Position
    const response = {
        iteraciones: [
            { iteracion: 1, a: 0, b: 1, xr: 0.6127, f_xr: -0.0450492, error: 1 },
            { iteracion: 2, a: 0.6127, b: 1, xr: 0.567143, f_xr: -0.000233, error: 0.08 },
        ],
        raiz: 0.567143,
        mensaje: "Raíz encontrada con la tolerancia especificada.",
    };

    res.status(200).json(response);
});


// Start the server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});
