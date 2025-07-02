import { baseApi } from './baseApi';

export interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}

export interface CreatePostRequest {
	title: string;
	body: string;
	userId: number;
}

export interface UpdatePostRequest {
	id: number;
	title?: string;
	body?: string;
	userId?: number;
}

// Extend the base API with posts endpoints
export const postsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// Get all posts
		getPosts: builder.query<Post[], void>({
			query: () => 'posts',
			providesTags: ['Post'],
		}),

		// Get single post by ID
		getPost: builder.query<Post, number>({
			query: (id) => `posts/${id}`,
			providesTags: (result, error, id) => [{ type: 'Post', id }],
		}),

		// Create new post
		createPost: builder.mutation<Post, CreatePostRequest>({
			query: (newPost) => ({
				url: 'posts',
				method: 'POST',
				body: newPost,
			}),
			invalidatesTags: ['Post'],
		}),

		// Update existing post
		updatePost: builder.mutation<Post, UpdatePostRequest>({
			query: ({ id, ...patch }) => ({
				url: `posts/${id}`,
				method: 'PATCH',
				body: patch,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
		}),

		// Delete post
		deletePost: builder.mutation<{ success: boolean }, number>({
			query: (id) => ({
				url: `posts/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Post'],
		}),
	}),
});

// Export hooks for usage in functional components
export const {
	useGetPostsQuery,
	useGetPostQuery,
	useCreatePostMutation,
	useUpdatePostMutation,
	useDeletePostMutation,
} = postsApi;
