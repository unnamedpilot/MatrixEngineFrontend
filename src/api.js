const BASE_URL = "http://127.0.0.1:8000" || import.meta.env.VITE_API_URL;

const apiRequest = async (endpoint, method = "GET", body = null) => {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(`API error: ${response.statusText}`);
            error.response = response;
            error.data = responseData;
            throw error;
        }

        return responseData;
    } catch (error) {
        console.error("Error in API request:", error);
        throw error;
    }
};


export default apiRequest;
