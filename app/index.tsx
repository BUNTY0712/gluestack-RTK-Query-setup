import { Link } from 'expo-router';
import { Box } from '~/components/ui/box';
import { Button, ButtonText } from '~/components/ui/button';
import { HStack } from '~/components/ui/hstack';
import { Text } from '~/components/ui/text';
import { VStack } from '~/components/ui/vstack';

export default function Index() {
	const handlePress = (buttonType: string) => {
		console.log(`${buttonType} button pressed!`);
	};

	return (
		<VStack className='flex-1 justify-center items-center p-6 bg-background'>
			{/* Header Section */}
			<Box className='bg-primary-500 p-6 rounded-xl mb-8 w-full max-w-md'>
				<Text className='text-2xl font-bold text-white text-center mb-2'>
					🎉 Gluestack UI + RTK Query
				</Text>
				<Text className='text-primary-100 text-center'>
					Beautiful Components with Powerful Data Fetching
				</Text>
			</Box>

			{/* Feature Cards */}
			<VStack space='md' className='w-full max-w-md'>
				<Box className='bg-white p-4 rounded-lg shadow-sm border border-outline-200'>
					<HStack space='sm' className='items-center mb-2'>
						<Text className='text-lg font-semibold text-typography-900'>
							⚡ Fast Setup
						</Text>
					</HStack>
					<Text className='text-typography-600 text-sm'>
						Get started quickly with pre-built components and themes
					</Text>
				</Box>

				<Box className='bg-white p-4 rounded-lg shadow-sm border border-outline-200'>
					<HStack space='sm' className='items-center mb-2'>
						<Text className='text-lg font-semibold text-typography-900'>
							🔄 RTK Query
						</Text>
					</HStack>
					<Text className='text-typography-600 text-sm'>
						Powerful data fetching with caching and synchronization
					</Text>
				</Box>
			</VStack>

			{/* RTK Query Demo Buttons */}
			<VStack space='md' className='w-full max-w-xs mt-8'>
				<Text className='text-center font-semibold text-typography-700 mb-2'>
					RTK Query Demos
				</Text>

				<Link href={'/posts' as any} asChild>
					<Button size='lg' className='bg-primary-500'>
						<ButtonText>📝 Posts Demo</ButtonText>
					</Button>
				</Link>

				<Link href={'/users' as any} asChild>
					<Button variant='solid' action='secondary' size='lg'>
						<ButtonText>👥 Users Demo</ButtonText>
					</Button>
				</Link>
			</VStack>

			{/* Original Action Buttons */}
			<VStack space='md' className='w-full max-w-xs mt-6'>
				<Text className='text-center font-semibold text-typography-700 mb-2'>
					UI Components
				</Text>

				<HStack space='sm' className='justify-center'>
					<Button
						variant='outline'
						size='sm'
						onPress={() => handlePress('Docs')}>
						<ButtonText>Docs</ButtonText>
					</Button>

					<Button
						variant='outline'
						action='positive'
						size='sm'
						onPress={() => handlePress('Examples')}>
						<ButtonText>Examples</ButtonText>
					</Button>
				</HStack>
			</VStack>

			{/* Footer */}
			<Box className='mt-auto pt-6'>
				<Text className='text-xs text-typography-400 text-center'>
					Gluestack UI v2 + RTK Query Setup Complete! 🚀
				</Text>
			</Box>
		</VStack>
	);
}
