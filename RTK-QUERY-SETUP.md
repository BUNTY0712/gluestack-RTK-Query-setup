# RTK Query Setup Documentation

This project now includes RTK Query for powerful data fetching and caching. Below is a comprehensive guide on how to use it.

## 📁 Project Structure

```
store/
├── index.ts          # Main store configuration
├── hooks.ts          # Typed hooks for Redux
└── api/
    ├── index.ts      # API exports
    ├── baseApi.ts    # Base API configuration
    ├── postsApi.ts   # Posts API endpoints
    └── usersApi.ts   # Users API endpoints
```

## 🚀 Quick Start

### 1. Basic Usage in Components

```tsx
import { useGetPostsQuery } from '~/store/api/postsApi';

function PostsList() {
	const { data: posts, isLoading, error } = useGetPostsQuery();

	if (isLoading) return <Text>Loading...</Text>;
	if (error) return <Text>Error occurred!</Text>;

	return (
		<VStack>
			{posts?.map((post) => (
				<Text key={post.id}>{post.title}</Text>
			))}
		</VStack>
	);
}
```

### 2. Mutations (Create/Update/Delete)

```tsx
import { useCreatePostMutation } from '~/store/api/postsApi';

function CreatePostButton() {
	const [createPost, { isLoading }] = useCreatePostMutation();

	const handleCreate = async () => {
		try {
			await createPost({
				title: 'New Post',
				body: 'Post content',
				userId: 1,
			}).unwrap();
		} catch (error) {
			console.error('Failed to create post:', error);
		}
	};

	return (
		<Button onPress={handleCreate} disabled={isLoading}>
			<ButtonText>Create Post</ButtonText>
		</Button>
	);
}
```

## 📊 Available APIs

### Posts API

- `useGetPostsQuery()` - Fetch all posts
- `useGetPostQuery(id)` - Fetch single post
- `useCreatePostMutation()` - Create new post
- `useUpdatePostMutation()` - Update existing post
- `useDeletePostMutation()` - Delete post

### Users API

- `useGetUsersQuery()` - Fetch all users
- `useGetUserQuery(id)` - Fetch single user
- `useGetUserPostsQuery(userId)` - Fetch posts by user

## 🎯 Key Features

### Automatic Caching

RTK Query automatically caches responses. Subsequent calls with the same parameters will return cached data.

### Background Refetching

Data is automatically refetched when:

- Window regains focus
- Network reconnects
- Cache expires

### Optimistic Updates

Use `optimisticUpdate` in mutations for instant UI feedback.

### Cache Invalidation

Use tags to invalidate related cache entries:

```tsx
// In baseApi.ts
tagTypes: ['Post', 'User'];

// Provide tags (what this endpoint caches)
providesTags: ['Post'];

// Invalidate tags (what this endpoint invalidates)
invalidatesTags: ['Post'];
```

## 🔧 Customization

### Adding New Endpoints

1. **Create new API file**: `store/api/newApi.ts`

```tsx
import { baseApi } from './baseApi';

export const newApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getData: builder.query<DataType[], void>({
			query: () => 'endpoint',
			providesTags: ['Data'],
		}),
	}),
});

export const { useGetDataQuery } = newApi;
```

2. **Export from index**: Add to `store/api/index.ts`

```tsx
export * from './newApi';
```

### Modifying Base Configuration

Edit `store/api/baseApi.ts`:

```tsx
export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://your-api.com/',
		prepareHeaders: (headers, { getState }) => {
			// Add authentication
			const token = selectToken(getState());
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: ['Post', 'User', 'NewTag'],
	endpoints: () => ({}),
});
```

## 📱 Demo Screens

Visit these screens to see RTK Query in action:

- **Posts Demo** (`/posts`) - CRUD operations with posts
- **Users Demo** (`/users`) - User listing and details

## 🛠️ Advanced Patterns

### Conditional Queries

```tsx
const { data } = useGetPostQuery(postId, {
	skip: !postId, // Skip query if no postId
});
```

### Polling

```tsx
const { data } = useGetPostsQuery(undefined, {
	pollingInterval: 5000, // Poll every 5 seconds
});
```

### Manual Refetch

```tsx
const { data, refetch } = useGetPostsQuery();

// Manually trigger refetch
const handleRefresh = () => refetch();
```

### Loading States

```tsx
const { data, isLoading, isFetching, isError } = useGetPostsQuery();

// isLoading: First time loading
// isFetching: Loading (including background refetch)
// isError: Error occurred
```

## 🔍 Debugging

### Redux DevTools

The store is configured with Redux DevTools for debugging:

- View cached data
- Monitor API calls
- Time-travel debugging

### Network Monitoring

Monitor API calls in:

- React Native Debugger
- Flipper (with Network plugin)
- Metro logs

## 📚 Additional Resources

- [RTK Query Docs](https://redux-toolkit.js.org/rtk-query/overview)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [React Redux Docs](https://react-redux.js.org/)

## 🎉 What's Next?

1. **Add Authentication**: Implement login/logout with token management
2. **Offline Support**: Add persistence with Redux Persist
3. **Real-time Updates**: Integrate WebSocket subscriptions
4. **Error Handling**: Add global error boundaries
5. **Performance**: Implement code splitting and lazy loading

Happy coding! 🚀
