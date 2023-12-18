import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default ({ to }: { to: string }) => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate(to);
	});
	return null;
};
