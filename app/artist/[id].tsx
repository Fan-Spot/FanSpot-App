import React from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Header } from '@/components/Header';
import {
	Go,
	Star,
	Fire,
	X,
	Instagram,
	Youtube,
	Facebook,
	Link,
} from '@/assets/icons';
import theme from '@/styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_WIDTH = Dimensions.get('window').width;

const artistData = {
	christopher: {
		name: 'Ado',
		image: require('@/assets/images/artist.png'),
		songs: 226,
		participated: 3,
		composed: 3,
		debut: '2011.09.16',
		genre: 'POP, 국외영화, 월드뮤직',
	},
};

export default function ArtistDetail() {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const artist = artistData[id as keyof typeof artistData];

	if (!artist) {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<Image
						source={require('@/assets/images/logo.png')}
						style={styles.logo}
					/>
				</View>
				<Header title='아티스트' />
				<Text style={{ color: '#fff', padding: 20 }}>
					존재하지 않는 아티스트입니다.
				</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Image
					source={require('@/assets/images/logo.png')}
					style={styles.logo}
				/>
			</View>
			<Header title='아티스트' />
			<ScrollView>
				<View style={styles.imageWrapper}>
					<Image
						source={artist.image}
						style={styles.artistImage}
						resizeMode='cover'
					/>
					<LinearGradient
						colors={['#00000000', '#131315b0', '#1B1C1F']}
						locations={[0, 0.53, 1]}
						style={styles.gradientOverlay}
					/>
					<View style={styles.imageContent}>
						<Text style={styles.artistName}>{artist.name}</Text>
						<View style={styles.metaRow}>
							<Text style={styles.metaText}>발매곡 {artist.songs}</Text>
							<View style={styles.dot} />
							<Text style={styles.metaText}>참여 {artist.participated}</Text>
							<View style={styles.dot} />
							<Text style={styles.metaText}>작사/작곡 {artist.composed}</Text>
						</View>
						<View style={styles.metaGroup}>
							<Text style={styles.metaLabel}>데뷔</Text>
							<Text style={styles.metaValue}>{artist.debut}</Text>
						</View>
						<View style={styles.metaGroup}>
							<Text style={styles.metaLabel}>장르</Text>
							<Text style={styles.metaValue}>{artist.genre}</Text>
						</View>
						<View style={styles.statsRow}>
							<View style={styles.statsItem}>
								<Star style={styles.statsIcon} />
								<Text style={styles.statsText}>43,747</Text>
							</View>
							<View style={styles.statsItem}>
								<Fire style={styles.statsIcon} />
								<Text style={styles.statsText}>235</Text>
							</View>
						</View>
						<View style={styles.socialRow}>
							<Link style={styles.icon} />
							<X style={styles.icon} />
							<Instagram style={styles.icon} />
							<Facebook style={styles.icon} />
							<Youtube style={[styles.icon, styles.lastIcon]} />
						</View>
					</View>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>아티스트 콘서트</Text>
					<View style={styles.concertCard}>
						<Image source={artist.image} style={styles.concertThumbnail} />
						<View style={styles.concertInfo}>
							<View style={styles.badge}>
								<Text style={styles.badgeText}>예매중</Text>
							</View>
							<Text style={styles.concertTitle}>
								오아시스 내한공연 OASIS Live ’25 SOUTH KOREA
							</Text>
							<View style={styles.concertMetaWrapper}>
								<Text style={styles.concertMeta}>고양종합운동장</Text>
								<Text style={styles.concertMeta2}>2025.10.21</Text>
							</View>
						</View>
					</View>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>아티스트 인기톡</Text>
					{[
						{
							title: '크리스토퍼 실물 본 썰 푼다.',
							body: '진짜 개잘생겼어요. 카메라가 실물을 못 담는게 맞는듯 진짜 참...',
							nickname: 'chris',
						},
						{
							title: '크리스 콘서트 꿀팁',
							body: '알려주세요ㅋㅋ',
							nickname: '멋쟁이',
						},
						{
							title: '콘서트 후기',
							body: '콘서트는 처음이었는데 진짜 현실 벗겨두고 현실도피한 것 처럼...',
							nickname: '두부',
						},
					].map((item, idx) => (
						<View key={idx} style={styles.postItem}>
							<Text style={styles.postTitle}>{item.title}</Text>
							<Text style={styles.postBody} numberOfLines={1}>
								{item.body}
							</Text>
							<View style={styles.postFooter}>
								<Text style={styles.nickname}>{item.nickname}</Text>
								<Text style={styles.postDate}>2025.01.21</Text>
							</View>
						</View>
					))}
					<TouchableOpacity
						style={styles.moreButton}
						onPress={() => router.push('/community')}
					>
						<View style={styles.moreButtonContent}>
							<Text style={styles.moreButtonText}>더보기</Text>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
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
	imageWrapper: {
		position: 'relative',
		width: SCREEN_WIDTH,
		height: 460,
	},
	artistImage: {
		width: '100%',
		height: '100%',
	},
	concertMeta: {
		color: theme.white,
		fontSize: 14,
		lineHeight: 18,
		fontFamily: 'Pretendard-Medium',
		marginBottom: 8,
	},
	concertMeta2: {
		color: theme.gray100,
		fontSize: 12,
		lineHeight: 18,
		fontFamily: 'Pretendard-Regular',
		marginBottom: 8,
	},

	gradientOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	imageContent: {
		position: 'absolute',
		bottom: 24,
		left: 20,
		right: 20,
	},
	artistName: {
		fontSize: 32,
		color: theme.white,
		fontFamily: 'Pretendard-Bold',
		marginBottom: 8,
	},
	metaRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 12,
	},
	metaText: {
		color: theme.white,
		fontSize: 14,
		fontFamily: 'Pretendard-Medium',
	},
	dot: {
		width: 4,
		height: 4,
		borderRadius: 2,
		marginHorizontal: 6,
		backgroundColor: theme.gray200,
	},
	metaGroup: {
		flexDirection: 'row',
		marginBottom: 4,
	},
	metaLabel: {
		color: theme.gray100,
		width: 40,
		fontSize: 14,
		fontFamily: 'Pretendard-Regular',
	},
	metaValue: {
		color: theme.white,
		fontSize: 14,
		fontFamily: 'Pretendard-Regular',
	},
	socialRow: {
		flexDirection: 'row',
		marginTop: 16,
		marginBottom: 14,
	},
	icon: {
		width: 28,
		height: 28,
		marginRight: 8,
	},
	lastIcon: {
		marginRight: 0,
	},
	statsRow: {
		flexDirection: 'row',
		marginTop: 6,
		gap: 20,
	},
	statsItem: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	statsIcon: {},
	statsText: {
		color: theme.gray50,
		fontSize: 14,
		marginLeft: 6,
		fontFamily: 'Pretendard-Regular',
	},
	section: {
		paddingHorizontal: 20,
		marginBottom: 32,
	},
	sectionTitle: {
		fontSize: 20,
		color: theme.white,
		fontFamily: 'Pretendard-Bold',
		marginBottom: 20,
		lineHeight: 24,
	},
	concertCard: {
		flexDirection: 'row',
		borderRadius: 6,
		overflow: 'hidden',
	},
	concertThumbnail: {
		width: 104,
		height: 148,
		marginRight: 4,
	},
	concertInfo: {
		flex: 1,
		padding: 12,
		justifyContent: 'center',
	},
	badge: {
		backgroundColor: theme.stateBackground.success,
		borderRadius: 2,
		paddingHorizontal: 7,
		paddingVertical: 3,
		alignSelf: 'flex-start',
		marginBottom: 6,
	},
	badgeText: {
		color: theme.state.success,
		fontSize: 10,
		fontFamily: 'Pretendard-SemiBold',
	},
	concertTitle: {
		color: theme.white,
		fontSize: 16,
		fontFamily: 'Giants-Bold',
		marginBottom: 16,
		lineHeight: 24,
		letterSpacing: 0.32,
	},
	postItem: {
		borderBottomColor: theme.gray500,
		borderBottomWidth: 0.5,
		paddingBottom: 14,
		paddingTop: 14,
	},
	postTitle: {
		color: theme.white,
		fontSize: 16,
		fontFamily: 'Pretendard-Medium',
		marginBottom: 4,
		lineHeight: 24,
	},
	postBody: {
		color: theme.gray50,
		fontFamily: 'Pretendard-Regular',
		fontSize: 14,
		marginBottom: 10,
		lineHeight: 24,
	},
	postFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	nickname: {
		color: theme.white,
		fontSize: 14,
		fontFamily: 'Pretendard-Regular',
	},
	postDate: {
		color: theme.gray100,
		fontSize: 12,
		fontFamily: 'Pretendard-Regular',
	},

	moreButton: {
		marginTop: 36,
		alignItems: 'center',
		justifyContent: 'center',
	},
	moreButtonContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	moreButtonText: {
		color: theme.gray100,
		fontSize: 16,
	},
	// moreButtonIcon: {
	// 	marginLeft: 12,
	// },
	concertMetaWrapper: {
		flexDirection: 'column',
		marginTop: 4,
	},
});
