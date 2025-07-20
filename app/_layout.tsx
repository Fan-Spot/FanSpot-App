import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		'Gotham Ultra Italic': require('../assets/fonts/Gotham Ultra Italic.ttf'),
		'Giants-Bold': require('../assets/fonts/Giants-Bold.otf'),
		'Giants-Inline': require('../assets/fonts/Giants-Inline.otf'),
		'Giants-Regular': require('../assets/fonts/Giants-Regular.otf'),
		'Pretendard-Light': require('../assets/fonts/Pretendard-Light.otf'),
		'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
		'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
		'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
		'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.otf'),
	});

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const colorScheme = useColorScheme();

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<Stack
				screenOptions={{
					animation: 'none',
				}}
			>
				<Stack.Screen name='login/index' options={{ headerShown: false }} />
				<Stack.Screen name='name/index' options={{ headerShown: false }} />
				<Stack.Screen name='complete/index' options={{ headerShown: false }} />
				<Stack.Screen name='home/index' options={{ headerShown: false }} />
				<Stack.Screen name='register/index' options={{ headerShown: false }} />
				<Stack.Screen name='artist/[id]' options={{ headerShown: false }} />
				<Stack.Screen name='concert/[id]' options={{ headerShown: false }} />
				<Stack.Screen name='community/index' options={{ headerShown: false }} />
				<Stack.Screen name='community/write' options={{ headerShown: false }} />
				<Stack.Screen name='artist/index' options={{ headerShown: false }} />
				<Stack.Screen name='community/[id]' options={{ headerShown: false }} />
				<Stack.Screen
					name='modal'
					options={{ presentation: 'modal', animation: 'none' }}
				/>
			</Stack>
		</ThemeProvider>
	);
}
