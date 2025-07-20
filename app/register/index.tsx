import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	Image,
	PermissionsAndroid,
	Platform,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Calendar } from 'react-native-calendars';
import theme from '@/styles/theme';
import { Header } from '@/components/Header';
import { Camera } from '@/assets/icons';

const formatDate = (dateStr: string) => {
	const date = new Date(dateStr);
	const days = ['일', '월', '화', '수', '목', '금', '토'];
	const day = days[date.getDay()];
	return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(
		2,
		'0'
	)}. ${String(date.getDate()).padStart(2, '0')}. (${day})`;
};

const getDatesBetween = (start: string, end: string) => {
	const result: string[] = [];
	let current = new Date(start);
	const last = new Date(end);

	while (current <= last) {
		result.push(current.toISOString().split('T')[0]);
		current.setDate(current.getDate() + 1);
	}
	return result;
};

const RegisterConcertScreen = () => {
	const [concertName, setConcertName] = useState('');
	const [artist, setArtist] = useState('');
	const [place, setPlace] = useState('');
	const [ticketLink, setTicketLink] = useState('');
	const [showCalendar, setShowCalendar] = useState(false);
	const [startDate, setStartDate] = useState<string | null>(null);
	const [endDate, setEndDate] = useState<string | null>(null);
	const [images, setImages] = useState<string[]>([]);

	const onDayPress = ({ dateString }: { dateString: string }) => {
		if (!startDate || (startDate && endDate)) {
			setStartDate(dateString);
			setEndDate(null);
		} else {
			if (new Date(dateString) < new Date(startDate)) {
				setStartDate(dateString);
				setEndDate(null);
			} else {
				setEndDate(dateString);
			}
		}
	};

	const getMarkedDates = () => {
		if (!startDate) return {};

		const end = endDate || startDate;
		const dates = getDatesBetween(startDate, end);

		const marked: Record<string, any> = {};
		dates.forEach((date) => {
			marked[date] = {
				color: theme.primary3,
				textColor: theme.white,
				startingDay: date === startDate,
				endingDay: date === end,
			};
		});
		return marked;
	};

	const renderPeriodText = () => {
		if (!startDate) return '날짜 선택';
		if (!endDate) return formatDate(startDate);
		return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
	};

	const handleImagePick = async () => {
		if (Platform.OS === 'android') {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
				{
					title: '이미지 접근 권한',
					message: '갤러리에서 사진을 선택하려면 권한이 필요합니다.',
					buttonNeutral: '나중에',
					buttonNegative: '취소',
					buttonPositive: '확인',
				}
			);
			if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
				return;
			}
		}
		launchImageLibrary(
			{ mediaType: 'photo', selectionLimit: 5 },
			(response) => {
				if (response.didCancel) return;
				if (response.assets) {
					const uris = response.assets
						.map((asset) => asset.uri || '')
						.filter(Boolean);
					setImages((prev) => [...prev, ...uris].slice(0, 5));
				}
			}
		);
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<Header title='콘서트 등록' />
			<ScrollView style={styles.container}>
				<View style={styles.form}>
					<TouchableOpacity
						style={styles.imageUploader}
						onPress={handleImagePick}
					>
						<Camera />
						<Text style={styles.imageCount}>{images.length}/5</Text>
					</TouchableOpacity>

					<View style={styles.previewContainer}>
						{images.map((uri, idx) => (
							<Image
								key={idx}
								source={{ uri }}
								style={styles.previewImage}
								resizeMode='cover'
							/>
						))}
					</View>

					<Text style={styles.label}>콘서트 이름</Text>
					<TextInput
						style={styles.input}
						placeholder='공식 콘서트명을 입력해주세요.'
						placeholderTextColor={theme.gray300}
						value={concertName}
						onChangeText={setConcertName}
					/>

					<Text style={styles.label}>아티스트</Text>
					<TextInput
						style={styles.input}
						placeholder='공식 아티스트명을 입력해주세요'
						placeholderTextColor={theme.gray300}
						value={artist}
						onChangeText={setArtist}
					/>

					<Text style={styles.label}>장소</Text>
					<TextInput
						style={styles.input}
						placeholder='콘서트 개최 장소를 입력해주세요.'
						placeholderTextColor={theme.gray300}
						value={place}
						onChangeText={setPlace}
					/>

					<Text style={styles.label}>공연 기간</Text>
					<TouchableOpacity
						style={styles.input}
						onPress={() => setShowCalendar((prev) => !prev)}
					>
						<Text style={styles.dateText}>{renderPeriodText()}</Text>
					</TouchableOpacity>

					{showCalendar && (
						<View style={styles.calendarWrapper}>
							<Calendar
								onDayPress={onDayPress}
								markedDates={getMarkedDates()}
								markingType='period'
								theme={{
									calendarBackground: theme.gray900,
									textSectionTitleColor: theme.gray300,
									dayTextColor: theme.white,
									todayTextColor: theme.white,
									monthTextColor: theme.white,
									arrowColor: theme.white,
									textDayFontFamily: 'Pretendard-Medium',
									textMonthFontFamily: 'Pretendard-Bold',
									textDayHeaderFontFamily: 'Pretendard-Medium',
								}}
							/>
						</View>
					)}

					<Text style={styles.label}>예매 링크</Text>
					<TextInput
						style={styles.input}
						placeholder='예매 가능한 링크를 입력해주세요.'
						placeholderTextColor={theme.gray300}
						value={ticketLink}
						onChangeText={setTicketLink}
					/>
				</View>

				<TouchableOpacity style={styles.submitButton}>
					<Text style={styles.submitText}>다음</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

export default RegisterConcertScreen;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: theme.background,
	},
	container: {
		flex: 1,
		padding: 20,
	},
	form: {
		marginBottom: 40,
	},
	label: {
		color: theme.white,
		fontSize: 16,
		marginTop: 28,
		marginBottom: 10,
		fontFamily: 'Pretendard-Medium',
	},
	input: {
		backgroundColor: theme.gray800,
		height: 48,
		borderWidth: 1,
		borderColor: theme.gray500,
		borderRadius: 2,
		paddingHorizontal: 16,
		justifyContent: 'center',
		color: theme.white,
	},
	dateText: {
		color: theme.white,
		fontSize: 16,
		fontFamily: 'Pretendard-Medium',
	},
	calendarWrapper: {
		marginTop: 12,
		borderRadius: 8,
		overflow: 'hidden',
	},
	submitButton: {
		backgroundColor: theme.primary3,
		paddingVertical: 14,
		alignItems: 'center',
		borderRadius: 6,
		marginBottom: 30,
	},
	submitText: {
		color: theme.white,
		fontSize: 16,
		fontFamily: 'Pretendard-Bold',
	},
	imageUploader: {
		width: 96,
		height: 96,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 2,
		borderColor: theme.gray700,
		borderWidth: 2,
	},
	imageCount: {
		color: theme.gray200,
		fontSize: 16,
		fontFamily: 'Pretendard-Medium',
		lineHeight: 24,
		marginTop: 10,
	},
	previewContainer: {
		flexDirection: 'row',
		gap: 8,
		marginTop: 12,
		flexWrap: 'wrap',
	},
	previewImage: {
		width: 60,
		height: 60,
		borderRadius: 4,
	},
});
