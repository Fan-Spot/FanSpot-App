import React, { useState } from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '@/styles/theme';
import { Header } from '@/components/Header';
import Heart from '@/assets/icons/Heart';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ConcertDetail() {
	const router = useRouter();
	const [isLiked, setIsLiked] = useState(false);

	// 날짜 기반 상태 계산
	const now = new Date();
	const bookingDate = new Date('2025-07-16');
	const concertDate = new Date('2025-07-20');

	let bookingStatus: '예매전' | '예매중' | '마감';
	if (now < bookingDate) bookingStatus = '예매전';
	else if (now <= concertDate) bookingStatus = '예매중';
	else bookingStatus = '마감';

	const handlePressArtist = (id: string) => {
		router.push(`/artist/${id}`);
	};

	const handleLike = () => {
		setIsLiked((prev) => !prev); // toggle
	};

	const handleLink = () => {
		if (bookingStatus === '예매전') {
			setIsLiked(true);
		} else {
			router.push('/home');
		}
	};

	const artists = [
		{
			id: 'ado',
			name: 'Ado',
			genre: 'J-pop, 랩/힙합',
			image: require('@/assets/images/sample3.png'),
		},
	];

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView style={styles.container}>
				<View style={styles.header}>
					<Image
						source={require('@/assets/images/logo.png')}
						style={styles.logo}
					/>
				</View>
				<Header title='콘서트' />
				<View style={styles.imageContainer}>
					<Image
						source={require('@/assets/images/sample2.png')}
						style={styles.mainImage}
						resizeMode='cover'
					/>
					<LinearGradient
						colors={['rgba(0,0,0,0)', 'rgba(19,19,21,0.69)', theme.background]}
						locations={[0, 0.53, 1]}
						style={styles.gradientOverlay}
					/>

					<View style={styles.overlayContent}>
						<View style={styles.statusRow}>
							<View style={styles.badge}>
								<Text style={styles.badgeText}>{bookingStatus}</Text>
							</View>
							<Text style={styles.editText}>수정</Text>
						</View>

						<Text style={styles.title}>Ado WORLD TOUR 2025 “Hibana”</Text>

						<View style={styles.infoRow}>
							<Text style={styles.infoTitleText}>장소</Text>
							<Text style={styles.infoText}>무신사 개러지</Text>
						</View>
						<View style={styles.infoRow}>
							<Text style={styles.infoTitleText}>예매</Text>
							<Text style={styles.infoText}>2025.07.16</Text>
						</View>
						<View style={styles.infoRow}>
							<Text style={styles.infoTitleText}>콘서트</Text>
							<Text style={styles.infoText}>2025.07.20</Text>
						</View>
					</View>
				</View>

				<View style={styles.section}>
					<Text style={styles.subtitle}>아티스트</Text>
					{artists.map((artist, i) => (
						<TouchableOpacity
							key={i}
							style={styles.artistCard}
							onPress={() => handlePressArtist(artist.id)}
						>
							<Image source={artist.image} style={styles.artistImage} />
							<View>
								<Text style={styles.artistName}>{artist.name}</Text>
								<Text style={styles.artistGenre}>{artist.genre}</Text>
							</View>
						</TouchableOpacity>
					))}
				</View>

				<View style={styles.bottomContainer}>
					<TouchableOpacity
						style={[
							styles.heartButton,
							isLiked ? styles.heartButtonActive : styles.heartButtonInactive,
						]}
						onPress={handleLike}
					>
						<Heart />
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.linkButton,
							bookingStatus === '예매전'
								? styles.linkButtonInactive
								: styles.linkButtonActive,
						]}
						onPress={handleLink}
					>
						<Text style={styles.linkText}>
							{bookingStatus === '예매전' ? '링크 추가하기' : '바로가기'}
						</Text>
					</TouchableOpacity>
				</View>
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
	imageContainer: {
		position: 'relative',
		width: SCREEN_WIDTH,
		height: 520,
	},
	mainImage: {
		width: '100%',
		height: '100%',
	},
	gradientOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	overlayContent: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		paddingHorizontal: 20,
		paddingVertical: 24,
	},
	statusRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 6,
	},
	badge: {
		backgroundColor: theme.stateBackground.info,
		borderRadius: 2,
		paddingHorizontal: 10,
		paddingVertical: 4,
		marginRight: 18,
		marginBottom: 14,
	},
	badgeText: {
		color: theme.state.info,
		fontSize: 14,
		fontFamily: 'Pretendard-SemiBold',
	},
	editText: {
		color: theme.gray100,
		fontSize: 16,
		fontFamily: 'Pretendard-Regular',
		marginBottom: 14,
	},
	title: {
		fontSize: 28,
		fontFamily: 'Giants-bold',
		color: theme.white,
		marginBottom: 18,
	},
	infoRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 4,
	},
	infoText: {
		color: theme.white,
		fontSize: 18,
		fontFamily: 'Pretendard-Regular',
		marginBottom: 6,
	},
	infoTitleText: {
		color: theme.gray100,
		fontFamily: 'Pretendard-Regular',
		marginRight: 10,
		fontSize: 16,
		marginBottom: 6,
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
		marginRight: 12,
	},
	artistName: {
		fontSize: 14,
		color: theme.white,
		marginBottom: 6,
		fontFamily: 'Giants-bold',
	},
	artistGenre: {
		fontSize: 12,
		color: theme.gray50,
		fontFamily: 'Pretendard-Regular',
		lineHeight: 18,
	},
	bottomContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 20,
		marginBottom: 40,
	},
	heartButton: {
		width: 52,
		height: 52,
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 12,
	},
	heartButtonInactive: {
		backgroundColor: '#474B54',
	},
	heartButtonActive: {
		backgroundColor: '#E15454',
	},
	linkButton: {
		flex: 1,
		height: 52,
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	linkButtonInactive: {
		backgroundColor: '#474B54',
	},
	linkButtonActive: {
		backgroundColor: '#F9C22E',
	},
	linkText: {
		color: 'white',
		fontFamily: 'Pretendard-Bold',
		fontSize: 16,
	},
});
