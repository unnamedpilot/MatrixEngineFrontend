import apiRequest from "../api";

export const useApi = () => {
    const post = async (endpoint, body) => {
        try {
            const response = await apiRequest(endpoint, "POST", body);
            return response; // Asegúrate de retornar la respuesta aquí
        } catch (error) {
            console.log(error.toString())
            handleHttpError(error);
        }
    };


    const get = async (endpoint) => {
        try {
            const response = await apiRequest(endpoint, "GET");
            return response;
        } catch (error) {
            handleHttpError(error);
        }
    };

    const handleHttpError = (error) => {
        console.log("El error es el siguiente: " + error.response);
        if (error.response) {
            const status = error.response.status;
            const detail = error.response.data?.detail || error.response.statusText;

            switch (status) {
                case 400:
                    throw new Error(`Bad Request: ${detail}`);
                case 404:
                    throw new Error(`Not Found: ${detail}`);
                case 500:
                    throw new Error(`Internal Server Error: ${detail}`);
                default:
                    throw new Error(`HTTP Error ${status}: ${detail}`);
            }
        } else if (error.json) {
            // Si el error tiene un cuerpo JSON (en caso de respuesta con error)
            return error.json().then((json) => {
                const detail = json.detail || "Unknown error occurred";
                return new Error(`HTTP Error: ${detail}`);
            });
        } else if (error.request) {
            // Si no se recibió respuesta del servidor
            return new Error("No response received from the server. Please check your connection.");
        } else {
            // Otros errores desconocidos
            return new Error("An unexpected error occurred. Please try again.");
        }
    };

    return { post, get };
};
