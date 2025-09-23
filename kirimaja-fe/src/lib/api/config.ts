// Configuration for API services

export const API_CONFIG = {
	baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
	timeout: 10000,
	retries: 3,
} as const;

export const MOCK_CONFIG = {
	enabled: true,
	delay: {
		min: 300,
		max: 1000,
	},
} as const;

// Environment-based configuration
export const getApiConfig = () => {
	const isDevelopment = import.meta.env.DEV;
	const isProduction = import.meta.env.PROD;

	return {
		...API_CONFIG,
		mockMode: isDevelopment && MOCK_CONFIG.enabled,
		baseURL: isProduction
			? import.meta.env.VITE_API_BASE_URL
			: API_CONFIG.baseURL,
	};
};
