import React from 'react';
import Svg, { SvgProps, Path, G } from 'react-native-svg';

const Facebook = (props: SvgProps) => (
	<Svg width='28' height='28' viewBox='0 0 28 28' fill='none' {...props}>
		<G scale={0.88} x={2} y={2}>
			<Path
				d='M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z'
				fill='#1877F2'
			/>
			<Path
				d='M18.755 18.0469L19.3535 14H15.6094V11.375C15.6094 10.2679 16.1325 9.1875 17.8095 9.1875H19.5117V5.74219C19.5117 5.74219 17.9669 5.46875 16.4898 5.46875C13.4061 5.46875 11.3906 7.40688 11.3906 10.9156V14H7.96289V18.0469H11.3906V27.8299C12.7884 28.0567 14.2116 28.0567 15.6094 27.8299V18.0469H18.755Z'
				fill='white'
			/>
		</G>
	</Svg>
);

export default Facebook;
