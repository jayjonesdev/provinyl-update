import * as React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { LoadingIndicatorContainer } from './styles';

const ProgressBar = () => {
	const [progress, setProgress] = React.useState(0);
	const [buffer, setBuffer] = React.useState(10);

	const progressRef = React.useRef(() => {});
	React.useEffect(() => {
		progressRef.current = () => {
			if (progress > 100) {
				setProgress(0);
				setBuffer(10);
			} else {
				const diff = Math.random() * 10;
				const diff2 = Math.random() * 10;
				setProgress(progress + diff);
				setBuffer(progress + diff + diff2);
			}
		};
	});

	React.useEffect(() => {
		const timer = setInterval(() => {
			progressRef.current();
		}, 500);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<Box sx={{ width: '100%' }}>
			Your collection is loading... please wait!
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<LinearProgress
					variant="buffer"
					value={progress}
					valueBuffer={buffer}
					sx={{ width: '100%', mr: 2 }}
				/>
				<Typography variant="body2" color="text.secondary">{`${Math.round(
					progress,
				)}%`}</Typography>
			</Box>
		</Box>
	);
};

export default () => {
	return (
		<LoadingIndicatorContainer>
			<ProgressBar />
		</LoadingIndicatorContainer>
	);
};
