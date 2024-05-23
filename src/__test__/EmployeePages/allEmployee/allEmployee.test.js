import AllEmployee from '@/components/Employee/AllEmployee/AllEmployee';
import '@testing-library/jest-dom';
import { useQuery } from 'react-query';
import { getByText, render, screen } from '@testing-library/react';

jest.mock('react-query', () => ({
	useQuery: jest.fn()
}));

describe('Testing AllEmployee components', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('renders loading spinner while data is fetching', async () => {
		useQuery.mockReturnValueOnce({ isLoading: true });
		render(<AllEmployee />);
		const loadingSpinner = await screen.getByTestId('loading-spinner');

		expect(loadingSpinner).toBeInTheDocument();
	});

	it('renders error message when there is an error fetching data', () => {
		useQuery.mockReturnValueOnce({ isLoading: false, isError: true });
		render(<AllEmployee />);
		const error = screen.getByText('Error');

		expect(error).toBeInTheDocument();
	});
});
