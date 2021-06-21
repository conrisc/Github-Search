import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SimpleList } from '.';

const mockedData = [
	{
		id: 1,
		label: 'Item #1',
		item: { name: 'John' },
	},
	{
		id: 2,
		label: 'Item #2',
		item: { name: 'Artur' },
	}
];

describe('SimpleList component', () => {
	test('should render all passed data', () => {
		const props = {
			data: mockedData,
			onRowClick: () => undefined,
		};
		const { getByText } = render(<SimpleList {...props} />);

		const item1 = getByText(props.data[0].label);
		expect(item1).toBeInTheDocument();
		const item2 = getByText(props.data[1].label);
		expect(item2).toBeInTheDocument();
	});

	test('should render header when it is passed', () => {
		const props = {
			header: 'Some header',
			data: mockedData,
			onRowClick: () => undefined,
		};
		const { getByText } = render(<SimpleList {...props} />);

		const header = getByText(props.header);
		expect(header).toBeInTheDocument();
	});

	test('should trigger onRowClick when row is clicked', () => {
		const props = {
			data: mockedData,
			onRowClick: jest.fn(),
		};
		const { getByText } = render(<SimpleList {...props} />);

		fireEvent.click(getByText(props.data[1].label));

		expect(props.onRowClick).toHaveBeenCalledTimes(1);
		expect(props.onRowClick).toHaveBeenCalledWith(expect.anything(), props.data[1].item);
	});
});
