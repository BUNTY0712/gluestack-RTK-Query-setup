import { ScrollView } from 'react-native';
import { Box } from '~/components/ui/box';
import { Button, ButtonText } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { HStack } from '~/components/ui/hstack';
import { Spinner } from '~/components/ui/spinner';
import { Text } from '~/components/ui/text';
import { VStack } from '~/components/ui/vstack';
import { useGetUsersQuery } from '~/store/api/usersApi';

export default function UsersScreen() {
	// RTK Query hook
	const {
		data: users,
		error,
		isLoading,
		refetch,
		isFetching,
	} = useGetUsersQuery();

	if (isLoading) {
		return (
			<VStack className='flex-1 justify-center items-center bg-background'>
				<Spinner size='large' />
				<Text className='mt-4 text-typography-600'>Loading users...</Text>
			</VStack>
		);
	}

	if (error) {
		return (
			<VStack className='flex-1 justify-center items-center p-4 bg-background'>
				<Text className='text-error-600 text-center mb-4'>
					Error loading users: {error.toString()}
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
			<Box className='bg-secondary-500 p-4 pt-12'>
				<HStack className='justify-between items-center'>
					<VStack>
						<Text className='text-white text-2xl font-bold'>
							Users Directory
						</Text>
						<Text className='text-secondary-100'>
							{users?.length || 0} users •{' '}
							{isFetching ? 'Refreshing...' : 'Ready'}
						</Text>
					</VStack>
					{isFetching && <Spinner color='white' />}
				</HStack>
			</Box>

			{/* Action Button */}
			<Box className='p-4 border-b border-outline-200'>
				<Button
					variant='outline'
					size='sm'
					onPress={() => refetch()}
					disabled={isFetching}>
					<ButtonText>
						{isFetching ? 'Refreshing...' : 'Refresh Users'}
					</ButtonText>
				</Button>
			</Box>

			{/* Users List */}
			<ScrollView className='flex-1 p-4'>
				<VStack space='md'>
					{users?.map((user) => (
						<Card key={user.id} className='p-4'>
							<VStack space='sm'>
								<HStack className='justify-between items-start'>
									<VStack className='flex-1'>
										<Text className='text-lg font-semibold text-typography-900'>
											{user.name}
										</Text>
										<Text className='text-primary-600 text-sm'>
											@{user.username}
										</Text>
									</VStack>
									<Text className='text-xs text-typography-400 bg-outline-100 px-2 py-1 rounded-full'>
										ID: {user.id}
									</Text>
								</HStack>

								<VStack space='xs'>
									<HStack className='items-center' space='sm'>
										<Text className='text-xs text-typography-500 w-16'>
											Email:
										</Text>
										<Text
											className='text-sm text-typography-700 flex-1'
											numberOfLines={1}>
											{user.email}
										</Text>
									</HStack>

									<HStack className='items-center' space='sm'>
										<Text className='text-xs text-typography-500 w-16'>
											Phone:
										</Text>
										<Text className='text-sm text-typography-700'>
											{user.phone}
										</Text>
									</HStack>

									<HStack className='items-center' space='sm'>
										<Text className='text-xs text-typography-500 w-16'>
											City:
										</Text>
										<Text className='text-sm text-typography-700'>
											{user.address.city}
										</Text>
									</HStack>

									{user.website && (
										<HStack className='items-center' space='sm'>
											<Text className='text-xs text-typography-500 w-16'>
												Website:
											</Text>
											<Text
												className='text-sm text-primary-600'
												numberOfLines={1}>
												{user.website}
											</Text>
										</HStack>
									)}
								</VStack>

								<Box className='mt-2 p-2 bg-outline-50 rounded-md'>
									<Text className='text-xs text-typography-600 font-medium mb-1'>
										Company: {user.company.name}
									</Text>
									<Text
										className='text-xs text-typography-500'
										numberOfLines={2}>
										"{user.company.catchPhrase}"
									</Text>
								</Box>
							</VStack>
						</Card>
					))}
				</VStack>
			</ScrollView>
		</VStack>
	);
}
