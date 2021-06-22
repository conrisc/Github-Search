import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { UserBrowser } from '.';
import { act } from 'react-dom/test-utils';

beforeAll(() => {
	jest.spyOn(window, 'fetch');
});

beforeEach(() => {
	(window.fetch as jest.Mock).mockImplementation(() => Promise.resolve({
		json: () => Promise.resolve({
			total_count: 1,
			items: [{
				id: 7321,
				login: 'HelloUserTest',
			}]
		})
	}));
});

describe('UserBrowser component', () => {
	test('should show loading indicator when users are fetched', async () => {
		const inputValue = 'Hello';
		const { container, getByLabelText } = render(<UserBrowser />);

		const input = container.querySelector('input');
		expect(input).toBeInTheDocument();
		fireEvent.change(input!, { target: { value: inputValue } });
		fireEvent.keyDown(input!, { key: 'Enter', code: 'Enter' });

		const loadingIndicator = getByLabelText('Loading');
		expect(loadingIndicator).toBeInTheDocument();
		await waitFor(() =>
			expect(loadingIndicator).not.toBeInTheDocument()
		);
	});

	test('should display list of users when users has been fetched', async () => {
		const inputValue = 'Hello';
		const { container, getByText } = render(<UserBrowser />);

		const input = container.querySelector('input');
		expect(input).toBeInTheDocument();
		fireEvent.change(input!, { target: { value: inputValue } });
		act(() => {
			fireEvent.keyDown(input!, { key: 'Enter', code: 'Enter' });
		});

		await waitFor(() =>
			expect(getByText('HelloUserTest')).toBeInTheDocument()
		);
	});
});
