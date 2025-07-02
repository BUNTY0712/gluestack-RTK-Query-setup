import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from './api/baseApi';

export const store = configureStore({
	reducer: {
		// Add the generated reducer as a specific top-level slice
		[baseApi.reducerPath]: baseApi.reducer,
		// Add other reducers here as needed
	},
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of RTK Query
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					// Ignore these action types
					'persist/PERSIST',
					'persist/REHYDRATE',
					'persist/PAUSE',
					'persist/PURGE',
					'persist/REGISTER',
					'persist/FLUSH',
				],
			},
		}).concat(baseApi.middleware),
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// See `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
