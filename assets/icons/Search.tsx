import React from 'react';
import Svg, { SvgProps, Path, Circle } from 'react-native-svg';

const Search = (props: SvgProps) => (
	<Svg width='20' height='21' viewBox='0 0 20 21' fill='none' {...props}>
		<Circle
			cx='9.13514'
			cy='8.65613'
			r='7.13514'
			stroke='#ACAFB2'
			stroke-width='1.5'
			stroke-linecap='round'
			stroke-linejoin='round'
		/>
		<Path
			d='M14.0405 13.9699L18.5 18.4294'
			stroke='#ACAFB2'
			stroke-width='1.5'
			stroke-linecap='round'
			stroke-linejoin='round'
		/>
	</Svg>
);

export default Search;
