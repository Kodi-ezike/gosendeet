/**
 * Centralized error handling utility for API requests
 * Extracts and formats error messages from various error response formats
 */

interface ApiErrorResponse {
  message?: string;
  [key: string]: unknown;
}

interface AxiosErrorShape {
  response?: {
    data?: unknown;
  };
  message?: string;
}

/**
 * Unwraps and throws a formatted error from various error response formats
 * Handles Axios error responses, error objects with messages, and string errors
 *
 * @param error - The error object to unwrap
 * @param fallbackMessage - Optional fallback message if no error details found
 * @throws Always throws a formatted error object with a message property
 */
export const throwApiError = (
  error: unknown,
  fallbackMessage = "Something went wrong"
): never => {
  // Handle object errors
  if (typeof error === "object" && error !== null) {
    // Check for Axios error response pattern
    const axiosError = error as AxiosErrorShape;
    if (axiosError.response?.data) {
      throw axiosError.response.data;
    }

    // Check for error with message property
    const errorWithMessage = error as ApiErrorResponse;
    if (
      typeof errorWithMessage.message === "string" &&
      errorWithMessage.message.trim()
    ) {
      throw { message: errorWithMessage.message };
    }
  }

  // Handle string errors
  if (typeof error === "string" && error.trim()) {
    throw { message: error };
  }

  // Fallback error
  throw { message: fallbackMessage };
};
