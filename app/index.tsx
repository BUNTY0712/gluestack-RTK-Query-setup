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
					🎉 Gluestack UI
				</Text>
				<Text className='text-primary-100 text-center'>
					Beautiful React Native Components
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
							🎨 Customizable
						</Text>
					</HStack>
					<Text className='text-typography-600 text-sm'>
						Tailwind CSS integration for easy styling and theming
					</Text>
				</Box>
			</VStack>

			{/* Action Buttons */}
			<VStack space='md' className='w-full max-w-xs mt-8'>
				<Button
					size='lg'
					className='bg-primary-500'
					onPress={() => handlePress('Primary')}>
					<ButtonText>Get Started</ButtonText>
				</Button>

				<Button
					variant='outline'
					size='lg'
					onPress={() => handlePress('Outline')}>
					<ButtonText>Learn More</ButtonText>
				</Button>

				<HStack space='sm' className='justify-center'>
					<Button
						variant='solid'
						action='secondary'
						size='sm'
						onPress={() => handlePress('Secondary')}>
						<ButtonText>Docs</ButtonText>
					</Button>

					<Button
						variant='solid'
						action='positive'
						size='sm'
						onPress={() => handlePress('Success')}>
						<ButtonText>Examples</ButtonText>
					</Button>
				</HStack>
			</VStack>

			{/* Footer */}
			<Box className='mt-auto pt-6'>
				<Text className='text-xs text-typography-400 text-center'>
					Edit app/index.tsx to customize this screen
				</Text>
			</Box>
		</VStack>
	);
}
