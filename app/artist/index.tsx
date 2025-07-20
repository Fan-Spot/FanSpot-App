import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	TextInput,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from '@/assets/icons';
import theme from '@/styles/theme';
import TabBar from '@/components/Tabbar';
import { Header } from '@/components/Header';

const SCREEN_WIDTH = Dimensions.get('window').width;

const popularArtists = [
	{
		id: '1',
		name: 'Christopher',
		image: require('@/assets/images/christopher.png'),
		genre: 'POP, 국외영화, 월드뮤직',
	},
	{
		id: '2',
		name: 'Ado',
		image: require('@/assets/images/ado.png'),
		genre: 'J-pop, 랩/힙합',
	},
];

const recommendedArtists = Array(4).fill({
	id: '1',
	name: 'Christopher',
	image: require('@/assets/images/christopher.png'),
	genre: 'POP, 국외영화, 월드뮤직',
});

export default function ArtistListScreen() {
	const router = useRouter();

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Image
					source={require('@/assets/images/logo.png')}
					style={styles.logo}
				/>
			</View>
			<Header title='아티스트' />

			<View style={styles.searchBox}>
				<TextInput
					style={styles.input}
					placeholder='아티스트명을 입력해주세요.'
					placeholderTextColor={theme.gray400}
				/>
				<Search />
			</View>

			<ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
				<Text style={styles.sectionTitle}>인기 아티스트</Text>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.popularScroll}
				>
					{popularArtists.map((artist, idx) => (
						<View key={idx} style={styles.popularCard}>
							<Image source={artist.image} style={styles.artistImage} />
							<View style={styles.popularTextWrapper}>
								<Text style={styles.artistName}>{artist.name}</Text>
								<Text style={styles.genre}>{artist.genre}</Text>
							</View>
						</View>
					))}
				</ScrollView>

				<Text style={styles.sectionTitle}>추천 아티스트</Text>
				<View style={styles.recommendList}>
					{recommendedArtists.map((artist, idx) => (
						<View key={idx} style={styles.recommendItem}>
							<Image source={artist.image} style={styles.recommendImage} />
							<View style={styles.recommendTextWrapper}>
								<Text style={styles.artistName}>{artist.name}</Text>
								<Text style={styles.genre}>{artist.genre}</Text>
							</View>
						</View>
					))}
				</View>
			</ScrollView>

			<TabBar />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.background,
	},
	header: {
		paddingHorizontal: 20,
		paddingVertical: 14,
		borderBottomColor: theme.gray600,
		borderBottomWidth: 0.5,
	},
	logo: {
		width: 90,
		height: 20,
		resizeMode: 'contain',
	},
	searchBox: {
		flexDirection: 'row',
		backgroundColor: theme.gray800,
		borderRadius: 4,
		marginHorizontal: 20,
		paddingHorizontal: 12,
		paddingVertical: 10,
		marginBottom: 20,
	},
	input: {
		flex: 1,
		fontSize: 14,
		color: theme.white,
		fontFamily: 'Pretendard-Regular',
	},
	sectionTitle: {
		fontSize: 22,
		fontFamily: 'Pretendard-Bold',
		color: theme.white,
		marginHorizontal: 20,
		marginBottom: 18,
		lineHeight: 24,
	},
	popularScroll: {
		paddingLeft: 20,
		marginBottom: 24,
	},
	popularCard: {
		width: 151,
		paddingVertical: 16,
		paddingHorizontal: 14,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: theme.gray400,
		backgroundColor: theme.gray700,
		marginRight: 12,
		marginBottom: 20,
	},

	popularTextWrapper: {
		alignItems: 'flex-start',
	},
	artistImage: {
		width: 92,
		height: 94,
		borderRadius: 2,
		marginBottom: 12,
		alignSelf: 'center',
	},
	artistName: {
		fontSize: 14,
		fontFamily: 'Giants-Bold',
		color: theme.white,
		lineHeight: 21,
	},
	genre: {
		fontSize: 12,
		fontFamily: 'Pretendard-Regular',
		color: theme.gray50,
		marginTop: 6,
		lineHeight: 18,
	},
	recommendList: {
		paddingHorizontal: 20,
	},
	recommendItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
		borderBottomWidth: 0.5,
		borderBottomColor: theme.gray700,
	},
	recommendImage: {
		width: 56,
		height: 56,
		borderRadius: 4,
		marginRight: 12,
	},
	recommendTextWrapper: {
		flex: 1,
		justifyContent: 'center',
	},
});
