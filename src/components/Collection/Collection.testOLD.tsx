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

	it('search field change', () => {
		const searchField = screen.getByPlaceholderText('Search collection...');

		fireEvent.change(searchField, {
			target: { value: 'A Tribe Called Quest' },
		});
		expect(searchField).toHaveValue('A Tribe Called Quest');
	});

	it('show user menu', () => {
		const menuBtn = screen.getByTestId('menu-button');

		expect(screen.getByRole('menu', { hidden: true })).toBeInTheDocument();
		fireEvent.click(menuBtn);
		expect(screen.getByRole('menu', { hidden: false })).toBeInTheDocument();
	});

	it('displays information dialog', () => {
		const menuBtn = screen.getByTestId('menu-button');
		fireEvent.click(menuBtn);
		const informationBtn = screen
			.getAllByRole('menuitem')
			.filter((button) => button.textContent === 'Information')[0];

		fireEvent.click(informationBtn);
		expect(screen.getByRole('dialog', { hidden: false }).innerHTML).toContain(
			'Information',
		);
	});
});
