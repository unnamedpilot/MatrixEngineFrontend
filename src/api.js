const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

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

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error in API request:", error);
        throw error;
    }
};

export default apiRequest;
