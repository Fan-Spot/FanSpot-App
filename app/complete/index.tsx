import { useRouter, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '@/styles/theme';

const CompleteScreen = () => {
	const router = useRouter();
	const { name } = useLocalSearchParams<{ name?: string }>();

	const handleConfirm = () => {
		router.replace('/home'); // 홈으로 이동
	};

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>
					<Text style={styles.bold}>배재현님, 가입이 완료됐어요!</Text>
				</Text>
				<Text style={styles.title}>
					<Text style={styles.bold}>팬스팟을 마음껏 즐겨보세요.</Text>
				</Text>
			</View>

			<TouchableOpacity
				style={styles.button}
				activeOpacity={0.8}
				onPress={handleConfirm}
			>
				<Text style={styles.buttonText}>확인</Text>
			</TouchableOpacity>
		</View>
	);
};

export default CompleteScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.gray900,
		justifyContent: 'space-between',
		paddingHorizontal: 24,
		paddingTop: 160,
		paddingBottom: 40,
	},
	content: {
		flex: 0.65,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		marginBottom: 36,
	},
	title: {
		color: theme.white,
		fontSize: 20,
		fontFamily: 'Pretendard-SemiBold',
		textAlign: 'center',
		lineHeight: 28,
		letterSpacing: -0.4,
		fontStyle: 'normal',
	},
	bold: {
		fontWeight: '700',
	},
	subtitle: {
		color: theme.white,
		fontSize: 16,
		fontFamily: 'Pretendard',
		fontWeight: '400',
		textAlign: 'center',
	},
	button: {
		backgroundColor: theme.primary3,
		height: 48,
		borderRadius: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		color: theme.white,
		fontSize: 16,
		fontFamily: 'Pretendard-SemiBold',
	},
});
