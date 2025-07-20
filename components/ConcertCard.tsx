// components/ConcertCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import theme from '@/styles/theme';

interface ConcertCardProps {
	image: any;
	dDay: string;
	title: string;
	place: string;
	date: string;

}

const ConcertCard = ({ image, dDay, title, place, date }: ConcertCardProps) => {
	return (
		<View style={styles.card}>
			<Image source={image} style={styles.image} resizeMode='cover' />
			<View style={styles.overlay}>
				<Text style={styles.dDay}>{dDay}</Text>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.place}>{place}</Text>
				<Text style={styles.date}>{date}</Text>
			</View>
		</View>
	);
};

export default ConcertCard;

const styles = StyleSheet.create({
	card: {
		width: 199,
		height: 265,
		borderRadius: 2,
		overflow: 'hidden',
		marginRight: 12,
	},
	image: {
		width: '100%',
		height: '100%',
		position: 'absolute',
	},
	overlay: {
		flex: 1,
		justifyContent: 'flex-end',
		padding: 12,
	},
	dDay: {
		fontSize: 22,
		color: theme.primary3,
		fontFamily: 'Giants-Bold',
	},
	title: {
		color: theme.white,
		fontSize: 16,
		fontFamily: 'Giants-Bold',
		paddingBottom: 14,
	},
	place: {
		color: theme.white,
		fontSize: 12,
		fontFamily: 'Pretendard-Regular',
		paddingBottom: 4,
	},
	date: {
		color: theme.white,
		fontSize: 11,
		fontFamily: 'Pretendard-Regular',
	},
});
