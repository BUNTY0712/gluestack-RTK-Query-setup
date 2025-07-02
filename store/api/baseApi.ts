import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base API configuration
export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://jsonplaceholder.typicode.com/', // Example API
		prepareHeaders: (headers, { getState }) => {
			// Add any default headers here
			headers.set('Content-Type', 'application/json');

			// You can add authentication tokens here if needed
			// const token = (getState() as RootState).auth.token;
			// if (token) {
			//   headers.set('Authorization', `Bearer ${token}`);
			// }

			return headers;
		},
	}),
	tagTypes: ['Post', 'User', 'Todo'], // Define cache tags for invalidation
	endpoints: () => ({}), // We'll add endpoints in separate files
});

export const { middleware: apiMiddleware } = baseApi;
