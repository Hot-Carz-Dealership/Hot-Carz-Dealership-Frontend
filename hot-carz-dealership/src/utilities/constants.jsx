// constants.js

// UNCOMMENT THESE LINES TO TEST LOCALLY AND COMMENT OUT THE OTHERS

export const BASE_URL = "http://localhost:5000";
export const FINANCE_URL = "http://localhost:5001";

// export const BASE_URL =
//   "https://hot-carz-dealership-backend-production.up.railway.app/";

// export const FINANCE_URL =
//   "https://hot-carz-financial-service-stub-production.up.railway.app/";

export const FOWARD_URL = `${BASE_URL}/foward?route=${FINANCE_URL}`;
