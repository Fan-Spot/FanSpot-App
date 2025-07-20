// app/login/index.tsx

import { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Google from '@/assets/icons/Google';
import Logo from '@/assets/icons/Logo';
import Spotify from '@/assets/icons/Spotify';
import theme from '@/styles/theme';

interface LoginButtonProps {
	icon: ReactNode;
	title: string;
	provider: 'google' | 'spotify';
}

const loginButtons: LoginButtonProps[] = [
	{ icon: <Google />, title: 'Google로 시작하기', provider: 'google' },
	{ icon: <Spotify />, title: 'Spotify로 시작하기', provider: 'spotify' },
];

export const OnBoarding = () => {
	const router = useRouter();

	const handleLogin = (provider: string) => {
		router.push('/name');
	};

	return (
		<View style={styles.onBoardingLayout}>
			<View style={styles.centerContainer}>
				<Logo />
				<Text style={styles.title}>FanSPOT</Text>
			</View>

			<View style={styles.bottomContainer}>
				{loginButtons.map(({ icon, title, provider }, index) => (
					<TouchableOpacity
						key={index}
						activeOpacity={0.8}
						style={styles.loginContainer}
						onPress={() => handleLogin(provider)}
					>
						<View>{icon}</View>
						<Text style={styles.loginTitle}>{title}</Text>
					</TouchableOpacity>
				))}

				<Text style={styles.footerText}>
					개인정보 수집 및 이용과 서비스 이용약관에{'\n'}
					동의함으로써 회원가입이 진행됩니다.
				</Text>
			</View>
		</View>
	);
};

export default OnBoarding;

const styles = StyleSheet.create({
	onBoardingLayout: {
		flex: 1,
		backgroundColor: theme.background,
		padding: 20,
		justifyContent: 'space-between',
	},

	centerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	title: {
		fontSize: 30,
		fontWeight: '900',
		color: theme.primary1,
		fontFamily: 'Gotham Ultra Italic',
		marginTop: 16,
		lineHeight: 28,
		letterSpacing: -0.6,
		fontStyle: 'italic',
	},

	bottomContainer: {
		width: '100%',
		gap: 6,
		marginBottom: 20,
	},

	loginContainer: {
		backgroundColor: theme.white,
		height: 56,
		borderRadius: 2,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		width: '100%',
	},

	loginTitle: {
		color: theme.gray900,
		fontSize: 16,
		flex: 1,
		fontFamily: 'Pretendard-Regular',
		textAlign: 'center',
		fontStyle: 'normal',
	},

	footerText: {
		fontFamily: 'Pretendard-Regular',
		fontStyle: 'normal',
		color: theme.gray100,
		fontSize: 12,
		textAlign: 'center',
		lineHeight: 20,
		marginTop: 6,
	},
});
