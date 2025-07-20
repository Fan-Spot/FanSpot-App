import { Text as DefaultText, View as DefaultView } from 'react-native';
import { useColorScheme } from './useColorScheme';
import theme from '@/styles/theme';

type ThemeProps = {
	lightColor?: string;
	darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

// 현재 theme 객체의 키를 색상 이름으로 제한
type ColorName = keyof typeof theme;

// 문자열 색상만 허용되도록 런타임 확인 포함
export function useThemeColor(
	props: { light?: string; dark?: string },
	colorName: ColorName
): string {
	const scheme = useColorScheme() ?? 'light';
	const colorFromProps = props[scheme];

	if (colorFromProps) {
		return colorFromProps;
	}

	const themeColor = theme[colorName];

	if (typeof themeColor === 'string') {
		return themeColor;
	} else {
		console.warn(
			`❗ theme["${colorName}"]는 문자열이 아닙니다. 반환값:`,
			themeColor
		);
		return '#000000'; // fallback 색상
	}
}

export function Text(props: TextProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const color = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'black' // 기본 텍스트 색상
	);

	return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'background'
	);

	return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
