import type { ApiError, AxiosErrorType } from "./api-error-types";

export const handleApiError = (errorData: ApiError): string => {
    // Handle validation errors if from Zod
    if (errorData.errors && Array.isArray(errorData.errors)) {
        const validationMessages = errorData.errors
            .map((error) => error.message)
            .join(", ");
        return validationMessages;
    }

    // Handle general error message
    return errorData.message || "Terjadi kesalahan, silahkan coba lagi.";
};

export const parseApiError = async (response: Response): Promise<string> => {
    try {
        const errorData: ApiError = await response.json();
        return handleApiError(errorData);
    } catch {
        // Fallback if response cannot be parsed
        return response.statusText || "Terjadi kesalahan, silahkan coba lagi.";
    }
};

// For axios error hadling
export const handleAxiosError = (error: AxiosErrorType): string => {
    // Handle axios error response
    if (error.response?.data) {
        const errorData: ApiError = error.response.data;
        return handleApiError(errorData);
    }

    // Handle network errors
    if (error.code === "ECONNABORTED") {
        return "Request timeout, silahkan coba lagi.";
    }

    if (error.message === "Network Error") {
        return "Tidak dapat terhubung ke server, silahkan cek koneksi internet Anda.";
    }

    // Fallback 
    return error.message || "Terjadi kesalahan, silahkan coba lagi.";
};