import { Container, DiscogsButton, LoginContainer, Logo } from './styles';
import PrimaryLogo from '../../assets/primary_logo.png';
import DiscogsIcon from './DiscogsIcon';
import { login } from '../../api';
import { isMobile } from 'react-device-detect';

export default () => {
	return (
		<Container>
			<LoginContainer>
				<Logo src={PrimaryLogo} />
				<DiscogsButton
					startIcon={<DiscogsIcon />}
					size={isMobile ? 'small' : 'large'}
					variant="outlined"
					onClick={login}
				>
					Login with Discogs
				</DiscogsButton>
			</LoginContainer>
		</Container>
	);
};
