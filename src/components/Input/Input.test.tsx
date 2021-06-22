import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '.';


describe('Input component', () => {
	test('should render input with placeholder', () => {
		render(<Input placeholder="Search sth" />);
		const input = screen.getByPlaceholderText(/Search sth/i);
		expect(input).toBeInTheDocument();
	});

	test('should render input with default value', () => {
		const defaultValue = 'Some default';
		const { container } = render(<Input defaultValue={defaultValue} />);
		const input = container.querySelector('input');
		expect(input).toHaveValue(defaultValue);
	});

	test('should trigger onChange when typed some character into the input', () => {
		const onChangeMock = jest.fn();
		const { container } = render(<Input onChange={onChangeMock} />);
		const input = container.querySelector('input');
		expect(input).toBeInTheDocument();
		fireEvent.change(input!, { target: { value: 'n' } });
		expect(onChangeMock).toHaveBeenCalledTimes(1);
	});

	test('should trigger onKeyDown when a key is clicked', () => {
		const onKeyDownMock = jest.fn();
		const { container } = render(<Input onKeyDown={onKeyDownMock} />);
		const input = container.querySelector('input');
		expect(input).toBeInTheDocument();
		fireEvent.keyDown(input!, { key: 'Enter', code: 'Enter' });
		expect(onKeyDownMock).toHaveBeenCalledTimes(1);
	});
});
