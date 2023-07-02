import { screen, render, fireEvent } from '@testing-library/react';
import Collection from '.';

describe('Collection Page', () => {
	beforeEach(() => {
		render(<Collection />);
	});

	it('view type toggle', () => {
		const toggleViewTypeBtn = screen.getByTestId('toggle-view-type-btn');

		expect(toggleViewTypeBtn.textContent).toEqual('View List');
		fireEvent.click(toggleViewTypeBtn);
		expect(toggleViewTypeBtn.textContent).toEqual('View Grid');
	});

	it('search field change', async () => {
		const searchField = screen.getByPlaceholderText('Search collection...');

		fireEvent.change(searchField, {
			target: { value: 'A Tribe Called Quest' },
		});
		expect(searchField).toHaveValue('A Tribe Called Quest');
	});
});
