import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Back } from '@/assets/icons';
import theme from '@/styles/theme';

interface HeaderProps {
	title: string;
	rightLabel?: string;
	onPressRight?: () => void;
}

export const Header = ({ title, rightLabel, onPressRight }: HeaderProps) => {
	const navigation = useNavigation();

	return (
		<View style={styles.headerContainer}>
			<TouchableOpacity
				style={styles.backWrapper}
				onPress={() => navigation.goBack()}
			>
				<Back />
			</TouchableOpacity>

			<View style={styles.titleWrapper}>
				<Text style={styles.headerTitle}>{title}</Text>
			</View>

			{rightLabel ? (
				<TouchableOpacity
					style={styles.rightWrapper}
					onPress={onPressRight}
					hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
				>
					<Text style={styles.rightLabel}>{rightLabel}</Text>
				</TouchableOpacity>
			) : (
				<View style={styles.rightWrapper} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		position: 'relative',
		width: '100%',
		height: 55,
		backgroundColor: theme.background,
		justifyContent: 'center',
		alignItems: 'center',
	},
	backWrapper: {
		position: 'absolute',
		left: 22,
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
	titleWrapper: {
		position: 'absolute',
		left: 0,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
	headerTitle: {
		color: theme.gray100,
		textAlign: 'center',
		fontFamily: 'Pretendard-Regular',
		fontSize: 16,
		lineHeight: 24,
		letterSpacing: 0,
	},
	rightWrapper: {
		position: 'absolute',
		right: 22,
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
	rightLabel: {
		color: theme.gray600,
		fontFamily: 'Pretendard-Regular',
		fontSize: 16,
	},
});
