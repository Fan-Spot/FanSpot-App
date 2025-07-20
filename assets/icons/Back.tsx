import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const Back = (props: SvgProps) => (
	<Svg width={24} height={24} viewBox='0 0 24 24' fill='none' {...props}>
		<Path
			d='M15.5946 19.7352C15.299 20.0636 14.7932 20.0902 14.4648 19.7946L6.4648 12.5945C6.29623 12.4427 6.19998 12.2266 6.19998 11.9998C6.19998 11.773 6.29624 11.5569 6.46481 11.4052L14.4648 4.20519C14.7932 3.90962 15.299 3.93624 15.5946 4.26465C15.8902 4.59306 15.8636 5.09889 15.5352 5.39446L8.19585 11.9998L15.5352 18.6054C15.8636 18.901 15.8902 19.4068 15.5946 19.7352Z'
			fill='#D2D4D5'
			fillRule='evenodd'
			clipRule='evenodd'
		/>
	</Svg>
);

export default Back;
