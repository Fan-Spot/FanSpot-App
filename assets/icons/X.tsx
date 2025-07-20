import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const X = (props: SvgProps) => (
	<Svg width='28' height='28' viewBox='0 0 28 28' fill='none' {...props}>
		<Path
			d='M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z'
			fill='black'
		/>
		<Path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M12.266 14.614L7.266 20.321H9.481L13.308 15.941L16.681 20.322L21 20.298L15.524 13.057L20.197 7.704H18.018L14.488 11.703L11.468 7.686H7L12.266 14.614ZM18.384 19.007H17.266L9.587 8.95H10.789L18.384 19.007Z'
			fill='white'
		/>
	</Svg>
);

export default X;
