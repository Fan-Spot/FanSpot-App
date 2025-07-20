// app/login/nickname.tsx

import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import theme from '@/styles/theme';

const NicknameScreen = () => {
	const [nickname, setNickname] = useState('');
	const router = useRouter();

	const handleNext = () => {
		if (nickname.trim().length > 0) {
			router.push('/complete');
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.select({ ios: 'padding', android: undefined })}
			style={styles.container}
		>
			<View style={styles.content}>
				<Text style={styles.heading}>반가워요!</Text>
				<Text style={styles.heading}>닉네임을 입력해주세요.</Text>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>닉네임</Text>
					<TextInput
						placeholder='닉네임을 입력해주세요.'
						placeholderTextColor={theme.gray400}
						value={nickname}
						onChangeText={setNickname}
						style={styles.input}
					/>
				</View>
			</View>

			<TouchableOpacity
				style={[
					styles.nextButton,
					{ backgroundColor: nickname.trim() ? theme.primary3 : theme.gray500 },
				]}
				onPress={handleNext}
				activeOpacity={0.8}
				disabled={!nickname.trim()}
			>
				<Text style={styles.nextText}>다음</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	);
};

export default NicknameScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.gray900,
		paddingHorizontal: 24,
		justifyContent: 'space-between',
		paddingTop: 120,
	},
	content: {},
	heading: {
		fontFamily: 'Pretendard-SemiBold',
		fontSize: 24,
		color: theme.white,
		lineHeight: 28,
		letterSpacing: -0.48,
	},
	inputContainer: {
		gap: 8,
	},
	label: {
		fontStyle: 'normal',
		fontFamily: 'Pretendard-Medium',
		color: theme.white,
		fontSize: 16,
		paddingTop: 41,
		letterSpacing: -0.32,
		paddingBottom: 10,
	},
	input: {
		backgroundColor: theme.gray800,
		height: 48,
		borderWidth: 1,
		borderColor: theme.gray500,
		borderRadius: 2,
		paddingHorizontal: 16,
		color: theme.gray50,
	},
	nextButton: {
		height: 48,
		borderRadius: 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 40,
	},
	nextText: {
		color: theme.white,
		fontFamily: 'Pretendard-SemiBold',
		fontSize: 16,
		lineHeight: 24,
	},
});
