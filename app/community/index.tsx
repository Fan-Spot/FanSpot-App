import React, { useState, useCallback } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	SafeAreaView,
	TextInput,
	Image,
	TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { Header } from '@/components/Header';
import theme from '@/styles/theme';
import TabBar from '@/components/Tabbar';

type Post = {
	id: string;
	title: string;
	body: string;
	nickname: string;
	date: string;
	imageUris?: string[];
};

export default function CommunityScreen() {
	const router = useRouter();
	const [posts, setPosts] = useState<Post[]>([]);

	useFocusEffect(
		useCallback(() => {
			const loadPosts = async () => {
				try {
					const saved = await AsyncStorage.getItem('posts');
					const parsed = saved ? JSON.parse(saved) : [];
					setPosts(parsed);
				} catch (err) {
					console.error(err);
				}
			};

			loadPosts();
		}, [])
	);

	return (
		<SafeAreaView style={styles.container}>
			<Header title='톡톡' />
			<View style={styles.searchBox}>
				<TextInput
					style={styles.searchInput}
					placeholder='검색어를 입력해주세요.'
					placeholderTextColor={theme.gray200}
				/>
			</View>

			<FlatList
				data={posts}
				keyExtractor={(item) => item.id}
				contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => router.push(`/community/${item.id}`)}
						activeOpacity={0.8}
					>
						<View style={styles.postItem}>
							<Text style={styles.postTitle}>{item.title}</Text>
							<Text style={styles.postBody} numberOfLines={1}>
								{item.body}
							</Text>

							{Array.isArray(item.imageUris) && item.imageUris[0] && (
								<Image
									source={{ uri: item.imageUris[0] }}
									style={styles.postImage}
								/>
							)}

							<View style={styles.postFooter}>
								<Text style={styles.nickname}>{item.nickname}</Text>
								<Text style={styles.postDate}>{item.date}</Text>
							</View>
						</View>
					</TouchableOpacity>
				)}
			/>

			<TouchableOpacity
				style={styles.writeButton}
				activeOpacity={0.8}
				onPress={() => router.push('/community/write')}
			>
				<Text style={styles.writeButtonText}>+ 글쓰기</Text>
			</TouchableOpacity>
			<TabBar />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: theme.background },
	searchBox: {
		paddingHorizontal: 20,
		marginTop: 12,
		marginBottom: 8,
	},
	searchInput: {
		backgroundColor: theme.gray800,
		color: theme.white,
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 6,
		fontSize: 14,
	},
	postItem: {
		borderBottomColor: theme.gray500,
		borderBottomWidth: 0.5,
		paddingVertical: 14,
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
	postImage: {
		width: 100,
		height: 100,
		borderRadius: 4,
		marginBottom: 10,
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
	writeButton: {
		position: 'absolute',
		right: 20,
		bottom: 80,
		backgroundColor: theme.primary3,
		paddingHorizontal: 12,
		paddingVertical: 12,
		borderRadius: 20,
		elevation: 6,
	},
	writeButtonText: {
		color: theme.white,
		fontSize: 18,
		fontFamily: 'Pretendard-SemiBold',
	},
});
