import apiRequest from "../api";

export const useApi = () => {
    const post = async (endpoint, body) => {
        try {
            const response = await apiRequest(endpoint, "POST", body);
            return response;
        } catch (error) {
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
        } else if (error.request) {
            throw new Error("No response received from the server. Please try again.");
        } else {
            throw new Error("An unexpected error occurred. Please try again.");
        }
    };

    return { post, get };
};
