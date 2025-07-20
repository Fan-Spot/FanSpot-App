import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '@/styles/theme';

interface ConcertListItemProps {
	image: any;
	badge: string;
	title: string;
	place: string;
	date: string;
	onPress?: () => void;
}

const ConcertListItem = ({
	image,
	badge,
	title,
	place,
	date,
	onPress,
}: ConcertListItemProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.8}
			style={styles.container}
		>
			<Image source={image} style={styles.poster} />
			<View style={styles.info}>
				<View style={styles.row}>
					<Text style={[styles.badge, getBadgeStyle(badge)]}>{badge}</Text>
					<Text style={styles.title}>{title}</Text>
				</View>
				<Text style={styles.place}>{place}</Text>
				<Text style={styles.date}>{date}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default ConcertListItem;

function getBadgeStyle(status: string) {
	switch (status) {
		case '예매전':
			return {
				backgroundColor: theme.stateBackground.info,
				color: theme.state.info,
			};
		case '예매중':
			return {
				backgroundColor: theme.stateBackground.success,
				color: theme.state.success,
			};
		case '마감':
			return {
				backgroundColor: theme.stateBackground.danger,
				color: theme.state.danger,
			};
		default:
			return {
				backgroundColor: theme.gray300,
				color: theme.white,
			};
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		marginBottom: 20,
	},
	poster: {
		width: 104,
		height: 138,
		borderRadius: 4,
		marginRight: 12,
	},
	info: {
		flex: 1,
		justifyContent: 'center',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		flexWrap: 'wrap',
		marginBottom: 28,
	},
	badge: {
		fontSize: 10,
		fontWeight: '600',
		fontFamily: 'Pretendard-Medium',
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 4,
		marginBottom: 4,
		marginRight: 6,
	},
	title: {
		color: theme.white,
		fontSize: 16,
		fontWeight: '700',
		lineHeight: 22,
		fontFamily: 'Giants-Bold',
		flexShrink: 1,
		marginTop: 2,
	},
	place: {
		color: theme.white,
		fontSize: 14,
		fontFamily: 'Pretendard-Medium',
		marginBottom: 2,
	},
	date: {
		color: theme.gray100,
		fontSize: 12,
		fontFamily: 'Pretendard-Regular',
	},
});
