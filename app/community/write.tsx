import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	Image,
	Alert,
	ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Header } from '@/components/Header';
import { Camera } from '@/assets/icons';
import theme from '@/styles/theme';

export default function CommunityWriteScreen() {
	const [images, setImages] = useState<string[]>([]);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const router = useRouter();

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsMultipleSelection: false,
			quality: 1,
		});
		if (!result.canceled) {
			const uri = result.assets[0].uri;
			if (images.length < 5) {
				setImages([...images, uri]);
			}
		}
	};

	const handleSave = async () => {
		if (!title || !body) {
			Alert.alert('제목과 내용을 입력해주세요.');
			return;
		}

		const newPost = {
			id: Date.now().toString(),
			title,
			body,
			nickname: '배재현',
			date: new Date().toISOString().split('T')[0],
			imageUris: images,
		};

		try {
			const prev = await AsyncStorage.getItem('posts');
			const parsed = prev ? JSON.parse(prev) : [];
			const updated = [newPost, ...parsed];
			await AsyncStorage.setItem('posts', JSON.stringify(updated));
			router.back();
		} catch (err) {
			console.error('저장 실패:', err);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Header title='톡톡 작성' rightLabel='완료' onPressRight={handleSave} />
			<ScrollView contentContainerStyle={styles.content}>
				<TouchableOpacity style={styles.imageBox} onPress={pickImage}>
					<Camera width={24} height={24} />
					<Text style={styles.imageText}>{images.length}/5</Text>
				</TouchableOpacity>

				<View style={styles.previewContainer}>
					{images.map((uri, idx) => (
						<Image key={idx} source={{ uri }} style={styles.previewImage} />
					))}
				</View>

				<TextInput
					style={styles.titleInput}
					placeholder='제목을 입력해주세요.'
					placeholderTextColor={theme.gray200}
					value={title}
					onChangeText={setTitle}
				/>

				<TextInput
					style={styles.bodyInput}
					placeholder='팬들과 나눌 이야기를 입력해주세요.'
					placeholderTextColor={theme.gray200}
					multiline
					textAlignVertical='top'
					value={body}
					onChangeText={setBody}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: theme.background },
	content: { paddingHorizontal: 20, paddingVertical: 16 },
	imageBox: {
		width: 96,
		height: 96,
		borderWidth: 1,
		borderColor: theme.gray600,
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 16,
	},
	imageText: { color: theme.gray200, fontSize: 16, marginTop: 14 },
	previewContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
		marginBottom: 16,
	},
	previewImage: {
		width: 60,
		height: 60,
		borderRadius: 4,
	},
	titleInput: {
		color: theme.gray200,
		fontSize: 20,
		fontFamily: 'Pretendard-Regular',
		marginBottom: 16,
	},
	bodyInput: {
		color: theme.gray200,
		fontSize: 18,
		fontFamily: 'Pretendard-Regular',
		lineHeight: 24,
	},
});
