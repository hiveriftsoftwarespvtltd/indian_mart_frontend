/**
 * Global Configuration for Frontend
 * Single source of truth for Backend URL and API Endpoints.
 * No .env files required!
 */

// Set to true to connect to local NestJS backend running on port 9003
const USE_LOCAL_NEST_BACKEND = false;

const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Base Server URL for static uploads & assets
export const BACKEND_URL = USE_LOCAL_NEST_BACKEND
  ? 'http://localhost:9003'
  : (isLocalhost ? '' : 'https://dhammaart.com/indian_mart_api');

// Base API Endpoint URL (v1)
export const BASE_URL = USE_LOCAL_NEST_BACKEND
  ? 'http://localhost:9003/api/v1'
  : (isLocalhost ? '/api/v1' : `${BACKEND_URL}/api/v1`);
