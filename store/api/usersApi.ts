import { baseApi } from './baseApi';

export interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
		geo: {
			lat: string;
			lng: string;
		};
	};
	phone: string;
	website: string;
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
}

// Extend the base API with users endpoints
export const usersApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// Get all users
		getUsers: builder.query<User[], void>({
			query: () => 'users',
			providesTags: ['User'],
		}),

		// Get single user by ID
		getUser: builder.query<User, number>({
			query: (id) => `users/${id}`,
			providesTags: (result, error, id) => [{ type: 'User', id }],
		}),

		// Get posts by user ID
		getUserPosts: builder.query<any[], number>({
			query: (userId) => `users/${userId}/posts`,
			providesTags: (result, error, userId) => [
				{ type: 'Post', id: 'PARTIAL-LIST' },
				{ type: 'User', id: userId },
			],
		}),
	}),
});

// Export hooks for usage in functional components
export const { useGetUsersQuery, useGetUserQuery, useGetUserPostsQuery } =
	usersApi;
