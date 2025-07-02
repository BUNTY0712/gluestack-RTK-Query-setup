import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Box } from '~/components/ui/box';
import { Button, ButtonText } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { HStack } from '~/components/ui/hstack';
import { Spinner } from '~/components/ui/spinner';
import { Text } from '~/components/ui/text';
import { VStack } from '~/components/ui/vstack';
import {
	useCreatePostMutation,
	useDeletePostMutation,
	useGetPostsQuery,
} from '~/store/api/postsApi';

export default function PostsScreen() {
	const [showCreateDemo, setShowCreateDemo] = useState(false);

	// RTK Query hooks
	const {
		data: posts,
		error,
		isLoading,
		refetch,
		isFetching,
	} = useGetPostsQuery();

	const [createPost, { isLoading: isCreating }] = useCreatePostMutation();

	const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

	// Demo function to create a new post
	const handleCreatePost = async () => {
		try {
			await createPost({
				title: `Demo Post ${Date.now()}`,
				body: 'This is a demo post created using RTK Query mutation!',
				userId: 1,
			}).unwrap();

			// Show success feedback
			setShowCreateDemo(true);
			setTimeout(() => setShowCreateDemo(false), 3000);
		} catch (error) {
			console.error('Failed to create post:', error);
		}
	};

	// Demo function to delete a post
	const handleDeletePost = async (postId: number) => {
		try {
			await deletePost(postId).unwrap();
			console.log(`Post ${postId} deleted successfully!`);
		} catch (error) {
			console.error('Failed to delete post:', error);
		}
	};

	if (isLoading) {
		return (
			<VStack className='flex-1 justify-center items-center bg-background'>
				<Spinner size='large' />
				<Text className='mt-4 text-typography-600'>Loading posts...</Text>
			</VStack>
		);
	}

	if (error) {
		return (
			<VStack className='flex-1 justify-center items-center p-4 bg-background'>
				<Text className='text-error-600 text-center mb-4'>
					Error loading posts: {error.toString()}
				</Text>
				<Button onPress={() => refetch()}>
					<ButtonText>Retry</ButtonText>
				</Button>
			</VStack>
		);
	}

	return (
		<VStack className='flex-1 bg-background'>
			{/* Header */}
			<Box className='bg-primary-500 p-4 pt-12'>
				<HStack className='justify-between items-center'>
					<VStack>
						<Text className='text-white text-2xl font-bold'>
							RTK Query Demo
						</Text>
						<Text className='text-primary-100'>
							Posts: {posts?.length || 0} •{' '}
							{isFetching ? 'Refreshing...' : 'Ready'}
						</Text>
					</VStack>
					{isFetching && <Spinner color='white' />}
				</HStack>
			</Box>

			{/* Action Buttons */}
			<Box className='p-4 border-b border-outline-200'>
				<HStack space='md'>
					<Button
						size='sm'
						onPress={handleCreatePost}
						disabled={isCreating}
						className='flex-1'>
						{isCreating ? (
							<Spinner size='small' color='white' />
						) : (
							<ButtonText>Create Post</ButtonText>
						)}
					</Button>

					<Button
						variant='outline'
						size='sm'
						onPress={() => refetch()}
						disabled={isFetching}
						className='flex-1'>
						<ButtonText>{isFetching ? 'Refreshing...' : 'Refresh'}</ButtonText>
					</Button>
				</HStack>

				{showCreateDemo && (
					<Box className='mt-3 p-3 bg-success-50 rounded-lg border border-success-200'>
						<Text className='text-success-700 text-sm'>
							✅ New post created! (This is a demo - the post won't actually
							appear in the list since we're using a mock API)
						</Text>
					</Box>
				)}
			</Box>

			{/* Posts List */}
			<ScrollView className='flex-1 p-4'>
				<VStack space='md'>
					{posts?.slice(0, 10).map((post) => (
						<Card key={post.id} className='p-4'>
							<VStack space='sm'>
								<HStack className='justify-between items-start'>
									<Text className='text-lg font-semibold text-typography-900 flex-1 pr-2'>
										{post.title}
									</Text>
									<Text className='text-xs text-typography-400 bg-outline-100 px-2 py-1 rounded-full'>
										#{post.id}
									</Text>
								</HStack>

								<Text className='text-typography-600 text-sm' numberOfLines={3}>
									{post.body}
								</Text>

								<HStack className='justify-between items-center mt-2'>
									<Text className='text-xs text-typography-400'>
										User ID: {post.userId}
									</Text>

									<Button
										size='xs'
										variant='outline'
										action='negative'
										onPress={() => handleDeletePost(post.id)}
										disabled={isDeleting}>
										{isDeleting ? (
											<Spinner size='small' />
										) : (
											<ButtonText>Delete</ButtonText>
										)}
									</Button>
								</HStack>
							</VStack>
						</Card>
					))}

					{/* Load more indicator */}
					<Box className='p-4'>
						<Text className='text-center text-typography-400 text-sm'>
							Showing first 10 posts • Total: {posts?.length || 0}
						</Text>
					</Box>
				</VStack>
			</ScrollView>
		</VStack>
	);
}
