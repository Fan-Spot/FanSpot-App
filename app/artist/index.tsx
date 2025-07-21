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

const recommendedArtists = [
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
	{
		id: '3',
		name: 'IU',
		image: require('@/assets/images/sample3.png'),
		genre: 'K-pop, 발라드',
	},
];

export default function ArtistListScreen() {
	const router = useRouter();

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView style={styles.container}>
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

				<View style={styles.section}>
					<Text style={styles.subtitle}>인기 아티스트</Text>
					{popularArtists.map((artist) => (
						<TouchableOpacity
							key={artist.id}
							style={styles.artistCard}
							onPress={() => router.push(`/artist/${artist.id}`)}
						>
							<Image source={artist.image} style={styles.artistImage} />
							<View>
								<Text style={styles.artistName}>{artist.name}</Text>
								<Text style={styles.artistGenre}>{artist.genre}</Text>
							</View>
						</TouchableOpacity>
					))}
				</View>

				<View style={styles.section}>
					<Text style={styles.subtitle}>추천 아티스트</Text>
					{recommendedArtists.map((artist) => (
						<TouchableOpacity
							key={artist.id}
							style={styles.artistCard}
							onPress={() => router.push(`/artist/${artist.id}`)}
						>
							<Image source={artist.image} style={styles.artistImage} />
							<View>
								<Text style={styles.artistName}>{artist.name}</Text>
								<Text style={styles.artistGenre}>{artist.genre}</Text>
							</View>
						</TouchableOpacity>
					))}
				</View>

				<TabBar />
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: theme.background,
	},
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
	section: {
		paddingHorizontal: 20,
		marginBottom: 24,
	},
	subtitle: {
		fontSize: 20,
		color: theme.white,
		fontFamily: 'Pretendard-Bold',
		marginBottom: 20,
	},
	artistCard: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 14,
	},
	artistImage: {
		width: 57,
		height: 58,
		borderRadius: 4,
		marginRight: 12,
	},
	artistName: {
		fontSize: 14,
		color: theme.white,
		marginBottom: 6,
		fontFamily: 'Giants-Bold',
	},
	artistGenre: {
		fontSize: 12,
		color: theme.gray50,
		fontFamily: 'Pretendard-Regular',
		lineHeight: 18,
	},
});
