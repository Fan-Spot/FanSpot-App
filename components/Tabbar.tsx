import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Artist, Community, Home } from '@/assets/icons';
import theme from '@/styles/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabBar = () => {
	const router = useRouter();
	const pathname = usePathname();
	const insets = useSafeAreaInsets();

	const isActive = (route: string) => {
		if (route === '/home') {
			return pathname === '/' || pathname === '/home';
		}
		return pathname.startsWith(route);
	};

	return (
		<View style={[styles.tabBar, { paddingBottom: insets.bottom }]}>
			<TouchableOpacity
				style={styles.tabItem}
				onPress={() => router.push('/artist')}
			>
				<Artist fill={isActive('/artist') ? theme.primary1 : theme.gray100} />
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.tabItem}
				onPress={() => router.push('/home')}
			>
				<Home fill={isActive('/home') ? theme.primary1 : theme.gray100} />
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.tabItem}
				onPress={() => router.push('/community')}
			>
				<Community
					fill={isActive('/community') ? theme.primary1 : theme.gray100}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default TabBar;

const styles = StyleSheet.create({
	tabBar: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingVertical: 10,
		borderTopWidth: 0.5,
		borderTopColor: theme.gray600,
		backgroundColor: theme.background,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	},
	tabItem: {
		alignItems: 'center',
	},
});
