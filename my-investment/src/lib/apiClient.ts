import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Set your API base URL in an environment variable
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authorization token
apiClient.interceptors.request.use(
  (config) => {
    // You can add a token from local storage or any auth context here
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses and errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Unauthorized - Redirecting to login.");
        // Optional: Add logic here to redirect to a login page or refresh the token
      }
      if (error.response.status === 403) {
        console.warn("Forbidden - You do not have permission.");
      }
      if (error.response.status === 500) {
        console.error("Server error - Please try again later.");
      }
    } else if (error.request) {
      console.error("Network error - Please check your connection.");
    } else {
      console.error("Error", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
