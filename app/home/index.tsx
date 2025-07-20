import React, { useState, useRef } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	TouchableOpacity,
	Animated,
	Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '@/styles/theme';
import ConcertCard from '@/components/ConcertCard';
import ConcertListItem from '@/components/ConcertListItem';
import TabBar from '@/components/Tabbar';

const { width: windowWidth } = Dimensions.get('window');
const CARD_WIDTH = 240;
const SPACING = 4;
const SIDE_PADDING = (windowWidth - CARD_WIDTH) / 2;

const popularConcerts = [
	{
		id: '1',
		image: require('@/assets/images/sample1.png'),
		dDay: 'D - 18',
		title: 'Ado WORLD TOUR 2025 “Hibana”',
		place: '일산 킨텍스 제2전시장',
		date: '2025.5.15',
	},
	{
		id: '2',
		image: require('@/assets/images/sample2.png'),
		dDay: 'D - Day',
		title: 'GALDIVE BLUE TOUR -SEOUL',
		place: '무신사 개러지',
		date: '2025.06.06',
	},
	{
		id: '3',
		image: require('@/assets/images/sample2.png'),
		dDay: 'D - Day',
		title: 'GALDIVE BLUE TOUR -SEOUL',
		place: '무신사 개러지',
		date: '2025.06.06',
	},
];

const concertList = [
	{
		id: '1',
		image: require('@/assets/images/sample1.png'),
		badge: '예매전',
		title: 'Ado WORLD TOUR 2025 “Hibana”',
		place: '일산 킨텍스 제2전시장 9홀',
		date: '2025.5.15',
	},
	{
		id: '2',
		image: require('@/assets/images/sample2.png'),
		badge: '예매중',
		title: '오아시스 내한공연 OASIS Live ’25 SOUTH KOREA',
		place: '고양종합운동장',
		date: '2025.10.21',
	},
	{
		id: '3',
		image: require('@/assets/images/sample2.png'),
		badge: '마감',
		title: 'MIKA NAKASHIMA ASIA TOUR 2025 in SEOUL',
		place: '화정체육관',
		date: '2025.05.10 ~ 05.11',
	},
];

const categories = ['추천', '최신', '인기'];

const HomeScreen = () => {
	const [selectedCategory, setSelectedCategory] = useState('추천');
	const router = useRouter();
	const scrollX = useRef(new Animated.Value(0)).current;

	const handlePressConcert = (id: string) => {
		router.push(`/concert/${id}`);
	};

	const handleConfirm = () => {
		router.replace('/register');
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerWrapper}>
				<View style={styles.header}>
					<Image
						source={require('@/assets/images/logo.png')}
						style={styles.logo}
					/>
				</View>
			</View>

			<ScrollView
				style={styles.scrollContainer}
				contentContainerStyle={{ paddingBottom: 120 }}
			>
				<Text style={styles.sectionTitle}>인기 콘서트</Text>

				<Animated.ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.cardScroll}
					contentContainerStyle={{ paddingHorizontal: SIDE_PADDING }}
					snapToInterval={CARD_WIDTH + SPACING}
					decelerationRate='fast'
					bounces={false}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{ useNativeDriver: true }
					)}
					scrollEventThrottle={16}
				>
					{popularConcerts.map((concert, index) => {
						const inputRange = [
							(index - 1) * (CARD_WIDTH + SPACING),
							index * (CARD_WIDTH + SPACING),
							(index + 1) * (CARD_WIDTH + SPACING),
						];

						const scale = scrollX.interpolate({
							inputRange,
							outputRange: [0.85, 1.1, 0.85],
							extrapolate: 'clamp',
						});

						return (
							<TouchableOpacity
								key={concert.id}
								activeOpacity={0.8}
								onPress={() => handlePressConcert(concert.id)}
							>
								<Animated.View
									style={[
										styles.animatedCard,
										{ transform: [{ scale }] },
										{ paddingBottom: 10 }, // 바텀 여백 추가
									]}
								>
									<ConcertCard {...concert} />
								</Animated.View>
							</TouchableOpacity>
						);
					})}
				</Animated.ScrollView>

				<View style={styles.concertListHeader}>
					<Text style={styles.concertTitle}>콘서트</Text>
					<View style={styles.categoryContainer}>
						{categories.map((cat, idx) => (
							<View key={cat} style={styles.categoryItem}>
								{idx !== 0 && <Text style={styles.divider}>|</Text>}
								<TouchableOpacity onPress={() => setSelectedCategory(cat)}>
									<Text
										style={[
											styles.categoryText,
											selectedCategory === cat && styles.categoryTextSelected,
										]}
									>
										{cat}
									</Text>
								</TouchableOpacity>
							</View>
						))}
					</View>
				</View>

				<View style={styles.concertList}>
					{concertList.map((concert) => (
						<ConcertListItem
							key={concert.id}
							image={concert.image}
							badge={concert.badge}
							title={concert.title}
							place={concert.place}
							date={concert.date}
							onPress={() => handlePressConcert(concert.id)}
						/>
					))}
				</View>
			</ScrollView>

			<TouchableOpacity style={styles.floatingButton} onPress={handleConfirm}>
				<Text style={styles.floatingButtonText}>+ 등록</Text>
			</TouchableOpacity>
			<TabBar />
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.background,
	},
	headerWrapper: {
		backgroundColor: theme.background,
	},
	header: {
		paddingVertical: 8,
		paddingHorizontal: 15,
		borderBottomWidth: 0.5,
		borderBottomColor: theme.gray600,
	},
	logo: {
		width: 120,
		height: 24,
		resizeMode: 'contain',
	},
	scrollContainer: {
		paddingHorizontal: 0,
	},
	sectionTitle: {
		fontSize: 22,
		fontWeight: 'bold',
		fontFamily: 'Pretendard-Bold',
		color: theme.white,
		marginBottom: 18,
		marginTop: 30,
		lineHeight: 24,
		paddingHorizontal: 20,
	},
	cardScroll: {
		marginBottom: 20,
	},
	animatedCard: {
		width: CARD_WIDTH,
		marginRight: SPACING,
	},
	concertListHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 24,
		marginBottom: 12,
		paddingHorizontal: 20,
	},
	concertTitle: {
		fontSize: 22,
		fontFamily: 'Pretendard-Bold',
		color: theme.white,
		marginRight: 18,
	},
	categoryContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	categoryItem: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	divider: {
		color: theme.gray50,
		marginHorizontal: 6,
	},
	categoryText: {
		fontSize: 16,
		color: theme.gray50,
		fontFamily: 'Pretendard-Regular',
	},
	categoryTextSelected: {
		fontSize: 16,
		color: theme.primary1,
		fontFamily: 'Pretendard-SemiBold',
	},
	concertList: {
		gap: 12,
		paddingHorizontal: 20,
	},
	floatingButton: {
		position: 'absolute',
		bottom: 80,
		right: 16,
		backgroundColor: theme.primary3,
		paddingHorizontal: 12,
		paddingVertical: 12,
		borderRadius: 20,
		elevation: 5,
	},
	floatingButtonText: {
		color: theme.white,
		fontFamily: 'Pretendard-SemiBold',
		fontSize: 18,
		lineHeight: 27,
	},
});
