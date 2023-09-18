import { Container, DiscogsButton, LoginContainer, Logo } from './styles';
import PrimaryLogo from '../../assets/primary_logo.png';
import DiscogsIcon from './DiscogsIcon';
import { login } from '../../api/auth';

export default () => {
	return (
		<Container>
			<LoginContainer>
				<Logo src={PrimaryLogo} />
				<DiscogsButton
					startIcon={<DiscogsIcon />}
					size='large'
					variant='outlined'
					// href='/collection'
					onClick={login}
				>
					Login with Discogs
				</DiscogsButton>
			</LoginContainer>
		</Container>
	);
};
