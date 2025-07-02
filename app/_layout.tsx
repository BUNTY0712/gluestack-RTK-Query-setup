import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { GluestackUIProvider } from '~/components/ui/gluestack-ui-provider';
import '~/global.css';
import { store } from '~/store';

export default function RootLayout() {
	return (
		<Provider store={store}>
			<GluestackUIProvider mode='light'>
				<Stack />
			</GluestackUIProvider>
		</Provider>
	);
}
