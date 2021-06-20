import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '.';


describe('Button component', () => {
	test('should render button with given label', () => {
		render(<Button label="Test me" onClick={() => undefined} />);
		const button = screen.getByText(/Test me/i);
		expect(button).toBeInTheDocument();
	});

	test('should trigger onClick when clicked', () => {
		const onClickMock = jest.fn();
		render(<Button label="Test me" onClick={onClickMock} />);
		const button = screen.getByText(/Test me/i);
		fireEvent.click(button);
		expect(onClickMock).toHaveBeenCalledTimes(1);
	});
});
