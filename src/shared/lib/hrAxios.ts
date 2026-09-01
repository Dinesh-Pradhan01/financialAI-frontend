import axios from "axios";
import { toast } from "sonner";
import { getIdToken } from "@/shared/firebase/auth";

const _rawBase = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL: string =
  _rawBase !== undefined && _rawBase !== null ? _rawBase : "http://127.0.0.1:8000";

export const hrApi = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/hr`,
  timeout: 30000,
  withCredentials: true,
});

// Request interceptor to attach Firebase token if needed
hrApi.interceptors.request.use(
  async (config) => {
    // If you need firebase token uncomment below, but backend seems to use session/cookies for standard routes
    // For now we'll just return config.
    return config;
  },
  (error) => Promise.reject(error),
);

hrApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      const message = error.response?.data?.message || error.message || "An error occurred";

      if (error.response?.status === 422) {
        if (error.config?.data) {
          console.log("Import Payload:", error.config.data);
        }
        const details = error.response.data?.details;
        if (details && Array.isArray(details)) {
          const formattedMessages = details
            .map((d: { loc: (string | number)[]; msg: string }) => {
              const path = d.loc.join(".");
              const match = path.match(/records\.(\d+)\.(.+)/);
              if (match) {
                const index = parseInt(match[1], 10);
                return `Row ${index + 1}: ${match[2]} - ${d.msg}`;
              }
              return `${path} - ${d.msg}`;
            })
            .join("\n");
          toast.error(`Validation Error:\n${formattedMessages}`, { duration: 6000 });
        } else {
          toast.error("Validation Error: Please check the data format.");
        }
      } else if (error.response?.status >= 500) {
        toast.error("Server Error: " + message);
      } else if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else if (error.response?.status === 404) {
        toast.error("Resource not found.");
      } else {
        const errorsList = error.response?.data?.errors;
        if (errorsList && Array.isArray(errorsList) && errorsList.length > 0) {
          console.error("API Errors:", errorsList);
          toast.error(`${message}\n\n${errorsList.join("\n")}`, { duration: 8000 });
        } else {
          toast.error(message);
        }
      }
    }

    return Promise.reject(error);
  },
);
