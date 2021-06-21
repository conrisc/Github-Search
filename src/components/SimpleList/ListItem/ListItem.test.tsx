import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ListItem } from '.';


describe('ListItem component', () => {
	test('should render item with label', () => {
		const props = {
			label: 'Item #1',
			item: 'a',
			onClick: () => undefined,
		};
		const { getByText } = render(<ListItem {...props} />);

		const item = getByText(props.label);
		expect(item).toBeInTheDocument();
	});

	test('should trigger onClick with item when row is clicked', () => {
		const onClickMock = jest.fn();
		const props = {
			label: 'Item #1',
			item: 'b',
			onClick: onClickMock,
		};
		const { getByText } = render(<ListItem {...props} />);

		const item = getByText(props.label);
		fireEvent.click(item);

		expect(onClickMock).toHaveBeenCalledTimes(1);
		expect(onClickMock).toHaveBeenCalledWith(expect.anything(), props.item);
	});
});
