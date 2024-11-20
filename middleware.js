module.exports = (req, res, next) => {
    if (req.method === "POST" && req.url === "/busquedas-incrementales") {
        // Simulated response for the POST request
        const response = {
            iteraciones: [
                {
                    iteracion: 1,
                    x0: 0,
                    x1: 0.1,
                    f_x0: 0,
                    f_x1: 0.0998334,
                    error: 0.0998334,
                },
                {
                    iteracion: 2,
                    x0: 0.1,
                    x1: 0.2,
                    f_x0: 0.0998334,
                    f_x1: 0.198669,
                    error: 0.0988356,
                },
            ],
            mensaje: "Root found in the interval [a, b].",
        };
        res.status(200).json(response);
    } else {
        next(); // Continue to default JSON Server behavior for other routes
    }
};
