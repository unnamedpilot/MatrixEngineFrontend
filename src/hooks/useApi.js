import apiRequest from "../api";

export const useApi = () => {
    const post = async (endpoint, body) => {
        try {
            const response = await apiRequest(endpoint, "POST", body);
            return response;
        } catch (error) {
            throw handleHttpError(error); // Manejamos y lanzamos el error
        }
    };

    const get = async (endpoint) => {
        try {
            const response = await apiRequest(endpoint, "GET");
            return response;
        } catch (error) {
            throw handleHttpError(error); // Igual que en post
        }
    };

    const handleHttpError = (error) => {
        if (error.response) {
            // Si el servidor devuelve un error con respuesta
            const status = error.response.status;
            const detail = error.response.data?.detail || error.response.statusText;

            // Devuelve un mensaje claro basado en el estado HTTP
            switch (status) {
                case 400:
                    return new Error(`Bad Request: ${detail}`);
                case 404:
                    return new Error(`Not Found: ${detail}`);
                case 500:
                    return new Error(`Internal Server Error: ${detail}`);
                default:
                    return new Error(`HTTP Error ${status}: ${detail}`);
            }
        } else if (error.request) {
            // Si no hay respuesta del servidor
            return new Error("No response received from the server. Please check your connection.");
        } else {
            // Otros errores
            return new Error("An unexpected error occurred. Please try again.");
        }
    };

    return { post, get };
};
