import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'react-native-svg';

const Google = (props: SvgProps) => (
	<Svg width={24} height={24} viewBox='0 0 24 24' {...props}>
		<Path
			fill='#4285F4'
			d='M21.35 11.1h-9.18v2.98h5.26c-.23 1.28-.92 2.36-1.95 3.08v2.56h3.16c1.85-1.7 2.91-4.21 2.91-7.17 0-.68-.06-1.33-.2-1.96Z'
		/>
		<Path
			fill='#34A853'
			d='M12.17 22c2.64 0 4.86-.87 6.48-2.36l-3.16-2.56c-.87.58-1.99.93-3.32.93-2.55 0-4.71-1.72-5.48-4.02H3.4v2.53A9.825 9.825 0 0 0 12.17 22Z'
		/>
		<Path
			fill='#FBBC05'
			d='M6.69 13.99a5.955 5.955 0 0 1 0-3.98V7.48H3.4a9.832 9.832 0 0 0 0 8.98l3.29-2.47Z'
		/>
		<Path
			fill='#EA4335'
			d='M12.17 6.2c1.43 0 2.72.49 3.73 1.45l2.79-2.79A9.77 9.77 0 0 0 12.17 2 9.825 9.825 0 0 0 3.4 7.48l3.29 2.53c.77-2.3 2.93-4 5.48-4Z'
		/>
	</Svg>
);

export default Google;
