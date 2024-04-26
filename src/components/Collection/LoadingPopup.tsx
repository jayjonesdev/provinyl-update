import * as React from 'react';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { LoadingIndicatorContainer } from './styles';
import { loadingProgressState, uiState } from '../../helpers/atoms';
import { useRecoilState } from 'recoil';

const ProgressBar = () => {
	const [buffer, setBuffer] = React.useState(10);
	const [progress] = useRecoilState(loadingProgressState);
	const [ui, setUiState] = useRecoilState(uiState);
	const progressRef = React.useRef(() => {});

	const hidePopup = () => setUiState({ ...ui, showLoadingPopup: false });

	React.useEffect(() => {
		progressRef.current = () => {
			if (progress > 100) {
				setBuffer(0);
			} else {
				const diff = Math.random() * 10;
				const diff2 = Math.random() * 10;
				const progressVal = progress + diff;
				setBuffer(progressVal >= 100 ? 100 : progressVal + diff2);
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
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Typography variant="body1" fontWeight={500} color="text.secondary">
					{progress < 100
						? 'The rest of your collection is currently loading.'
						: 'Your collection has finished loading.'}
				</Typography>
				{progress === 100 && (
					<Button
						variant="contained"
						size="small"
						sx={{ alignSelf: 'flex-end' }}
						onClick={hidePopup}
					>
						Hide
					</Button>
				)}
			</Box>
			{progress !== 100 && (
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
			)}
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
