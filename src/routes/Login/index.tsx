import {
	Container,
	DiscogsButton,
	LoginContainer,
	Logo,
	StyledDiscogsLogo,
} from './styles';
import PrimaryLogo from '../../assets/primary_logo.png';
import DiscogsLogo from '../../assets/discogs_logo.png';

export default () => {
	const DiscogsIcon = () => (
		<StyledDiscogsLogo src={DiscogsLogo} alt='DiscogsIcon' />
	);

	return (
		<Container>
			<LoginContainer>
				<Logo src={PrimaryLogo} />
				<DiscogsButton
					startIcon={<DiscogsIcon />}
					size='large'
					variant='outlined'
					href='/collection'
				>
					Login with Discogs
				</DiscogsButton>
			</LoginContainer>
		</Container>
	);
};
