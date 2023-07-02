import { screen, render, fireEvent } from '@testing-library/react';
import Collection from '.';

describe('Collection Page', () => {
	it('View Type changes', async () => {
		render(<Collection />);

		const toggleViewTypeBtn = screen.getByTestId('toggle-view-type-btn');
		expect(toggleViewTypeBtn.textContent).toEqual('View List');
		fireEvent.click(toggleViewTypeBtn);
		expect(toggleViewTypeBtn.textContent).toEqual('View Grid');
	});
});
