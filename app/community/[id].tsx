import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
	TextInput,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '@/styles/theme';
import { Header } from '@/components/Header';
import { Forward } from '@/assets/icons';

type Post = {
	id: string;
	title: string;
	body: string;
	nickname: string;
	date: string;
	imageUris?: string[];
};

type Comment = {
	id: string;
	nickname: string;
	content: string;
	date: string;
};

export default function PostDetailScreen() {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const [post, setPost] = useState<Post | null>(null);
	const [allPosts, setAllPosts] = useState<Post[]>([]);
	const [comments, setComments] = useState<Comment[]>([]);
	const [inputText, setInputText] = useState('');

	useEffect(() => {
		const loadPost = async () => {
			try {
				const stored = await AsyncStorage.getItem('posts');
				if (!stored) return;
				const posts: Post[] = JSON.parse(stored);
				const found = posts.find((p) => p.id === id);
				setAllPosts(posts);
				if (found) setPost(found);
			} catch (e) {
				console.error('게시글 로딩 오류:', e);
			}
		};
		loadPost();
	}, [id]);

	const handleAddComment = () => {
		if (!inputText.trim()) return;
		const newComment: Comment = {
			id: Date.now().toString(),
			nickname: 'chris',
			content: inputText,
			date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
		};
		setComments([...comments, newComment]);
		setInputText('');
	};

	if (!post) {
		return (
			<SafeAreaView style={styles.container}>
				<Header title='톡톡' />
				<Text style={styles.loadingText}>게시글을 불러오는 중입니다...</Text>
			</SafeAreaView>
		);
	}

	const otherPosts = allPosts.filter((p) => p.id !== post.id);

	return (
		<SafeAreaView style={styles.container}>
			<Header title='톡톡' />
			<ScrollView style={styles.content}>
				{/* 상단 정보 (작성자, 수정/삭제 버튼) */}
				<View style={styles.topBar}>
					<Text style={styles.nickname}>{post.nickname}</Text>
					<View style={styles.actions}>
						<TouchableOpacity>
							<Text style={styles.actionText}>수정</Text>
						</TouchableOpacity>
						<Text style={styles.actionDivider}>|</Text>
						<TouchableOpacity>
							<Text style={styles.actionText}>삭제</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* 본문 */}
				<Text style={styles.title}>{post.title}</Text>
				<Text style={styles.body}>{post.body}</Text>

				{post.imageUris?.map((uri, idx) => (
					<Image key={idx} source={{ uri }} style={styles.image} />
				))}

				<Text style={styles.date}>{post.date.replace(/-/g, '.')}</Text>

				{/* 댓글 */}
				<View style={{ marginTop: 32 }}>
					<Text style={styles.commentHeader}>댓글</Text>
					<View style={styles.commentInputContainer}>
						<TextInput
							value={inputText}
							onChangeText={setInputText}
							placeholder='답변을 작성해 주세요.'
							placeholderTextColor={theme.gray300}
							style={styles.commentTextInput}
						/>
						<TouchableOpacity
							onPress={handleAddComment}
							style={styles.sendIconWrapper}
						>
							<Forward width={20} height={20} color={theme.gray100} />
						</TouchableOpacity>
					</View>
					{comments.map((c) => (
						<View key={c.id} style={styles.commentBlock}>
							<View style={styles.commentHeaderRow}>
								<Text style={styles.commentNickname}>{c.nickname}</Text>
								<Text style={styles.commentDate}>{c.date}</Text>
							</View>
							<Text style={styles.commentText}>{c.content}</Text>
						</View>
					))}
				</View>

				{/* 다른 톡톡 */}
				<View style={{ marginTop: 40 }}>
					<Text style={styles.commentHeader}>다른 톡톡</Text>
					{otherPosts.map((p) => (
						<TouchableOpacity
							key={p.id}
							onPress={() => router.push(`/community/${p.id}`)}
						>
							<View style={styles.otherPostItem}>
								<Text style={styles.otherPostTitle}>{p.title}</Text>
								<Text style={styles.otherPostPreview} numberOfLines={1}>
									{p.body}
								</Text>
								<View style={styles.otherPostFooter}>
									<Text style={styles.otherPostNickname}>{p.nickname}</Text>
									<Text style={styles.otherPostDate}>
										{p.date.replace(/-/g, '.')}
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: theme.background },
	topBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: 12,
	},
	nickname: {
		color: theme.white,
		fontSize: 16,
		fontFamily: 'Pretendard-Regular',
		lineHeight: 24,
	},
	actions: { flexDirection: 'row', alignItems: 'center' },
	actionText: {
		color: theme.gray100,
		fontSize: 16,
		fontFamily: 'Pretendard-Regular',
	},
	actionDivider: { color: theme.gray200, marginHorizontal: 6 },
	content: { paddingHorizontal: 20, paddingTop: 20 },
	title: {
		color: theme.white,
		fontSize: 20,
		fontFamily: 'Pretendard-Bold',
		marginBottom: 8,
	},
	body: {
		color: theme.white,
		fontSize: 16,
		fontFamily: 'Pretendard-Regular',
		lineHeight: 22,
		marginBottom: 16,
	},
	image: {
		width: 120,
		height: 120,
		borderRadius: 2,
		marginTop: 18,
	},
	date: {
		color: theme.gray100,
		fontSize: 14,
		fontFamily: 'Pretendard-Regular',
		marginTop: 20,
	},
	loadingText: {
		color: theme.gray100,
		fontSize: 16,
		padding: 20,
	},

	// 댓글
	commentHeader: {
		color: theme.white,
		fontSize: 18,
		fontFamily: 'Pretendard-Bold',
		marginBottom: 8,
	},
	commentInputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: theme.gray700,
		borderRadius: 2,
		paddingHorizontal: 12,
		borderColor: theme.gray600,
		borderWidth: 1,
		paddingVertical: 10,
		marginTop: 8,
	},
	commentTextInput: {
		flex: 1,
		color: theme.white,
		fontSize: 14,
		paddingRight: 8,
	},
	sendIconWrapper: {
		paddingLeft: 4,
		paddingRight: 4,
	},
	commentBlock: {
		marginTop: 16,
		paddingBottom: 12,
		borderBottomColor: theme.gray600,
		borderBottomWidth: 1,
	},
	commentHeaderRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 4,
	},
	commentNickname: {
		color: theme.gray100,
		fontSize: 14,
		fontFamily: 'Pretendard-Medium',
		lineHeight: 24,
	},
	commentDate: {
		color: theme.gray100,
		fontSize: 12,
		fontFamily: 'Pretendard-Regular',
		lineHeight: 24,
	},
	commentText: {
		color: theme.gray100,
		fontSize: 14,
		fontFamily: 'Pretendard-Regular',
		lineHeight: 21,
	},

	// 다른 톡톡
	otherPostItem: {
		paddingVertical: 16,
		borderBottomColor: theme.gray600,
		borderBottomWidth: 1,
	},
	otherPostTitle: {
		color: theme.white,
		fontSize: 14,
		fontFamily: 'Pretendard-Medium',
		marginBottom: 4,
		lineHeight: 24,
	},
	otherPostPreview: {
		color: theme.gray100,
		fontSize: 14,
		fontFamily: 'Pretendard-Regular',
		lineHeight: 24,
		marginBottom: 8,
	},
	otherPostFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	otherPostNickname: {
		color: theme.gray100,
		fontSize: 14,
		fontFamily: 'Pretendard-Regular',
		lineHeight: 24,
	},
	otherPostDate: {
		color: theme.gray100,
		fontSize: 12,
		fontFamily: 'Pretendard-Regular',
	},
});
