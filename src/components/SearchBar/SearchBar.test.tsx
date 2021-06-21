
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SearchBar } from '.';


describe('SearchBar component', () => {
	test('should trigger onSearch with typed value when button has been clicked', () => {
		const onSearchMock = jest.fn();
		const inputValue = 'Awesome value';
		const { container, getByRole } = render(<SearchBar onSearch={onSearchMock} />);

		const input = container.querySelector('input');
		expect(input).toBeInTheDocument();
		fireEvent.change(input!, { target: { value: inputValue } });

		const button = getByRole('button');
		fireEvent.click(button);

		expect(onSearchMock).toHaveBeenCalledTimes(1);
		expect(onSearchMock).toHaveBeenCalledWith(inputValue);
	});

	test('should trigger onSearch with typed value when enter has been pressed', () => {
		const onSearchMock = jest.fn();
		const inputValue = 'Awesome value 2';
		const { container } = render(<SearchBar onSearch={onSearchMock} />);

		const input = container.querySelector('input');
		expect(input).toBeInTheDocument();
		fireEvent.change(input!, { target: { value: inputValue } });
		fireEvent.keyDown(input!, { key: 'Enter', code: 'Enter' });

		expect(onSearchMock).toHaveBeenCalledTimes(1);
		expect(onSearchMock).toHaveBeenCalledWith(inputValue);
	});

	test('should NOT trigger onSearch when input is empty and button has been clicked', () => {
		const onSearchMock = jest.fn();
		const { container, getByRole } = render(<SearchBar onSearch={onSearchMock} />);

		const input = container.querySelector('input');
		expect(input).toBeInTheDocument();
		fireEvent.change(input!, { target: { value: '' } });

		const button = getByRole('button');
		fireEvent.click(button);

		expect(onSearchMock).not.toHaveBeenCalled();
	});

	test('should NOT trigger onSearch when input is empty and enter has been pressed', () => {
		const onSearchMock = jest.fn();
		const { container } = render(<SearchBar onSearch={onSearchMock} />);

		const input = container.querySelector('input');
		expect(input).toBeInTheDocument();
		fireEvent.change(input!, { target: { value: '' } });
		fireEvent.keyDown(input!, { key: 'Enter', code: 'Enter' });

		expect(onSearchMock).not.toHaveBeenCalled();
	});
});
