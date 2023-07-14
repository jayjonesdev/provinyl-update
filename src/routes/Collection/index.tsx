import Toolbar from './Toolbar';
import { useState } from 'react';
import { ViewType } from '../../helpers/enum';
import SearchBar from './SearchBar';
import { Container, StyledDivider } from './styles';
import Table from './Table';

export default () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [viewType, setViewType] = useState<ViewType>(ViewType.GRID);

	const toggleViewType = () => {
		if (viewType === ViewType.GRID) setViewType(ViewType.LIST);
		else setViewType(ViewType.GRID);
	};

	return (
		<div>
			<Toolbar value='485' numOfItems='23,245' />
			<Container>
				<SearchBar
					value={searchValue}
					viewType={viewType}
					onChange={(value) => setSearchValue(value)}
					toggleView={toggleViewType}
				/>
				<StyledDivider />
				<Table />
			</Container>
		</div>
	);
};
