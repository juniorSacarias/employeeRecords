import OneEmployee from "@/components/Employee/IdEmployee/OneEmployee";
import '@testing-library/jest-dom';
import { useQuery } from "react-query";
import { render, screen } from '@testing-library/react';

jest.mock('react-query', () => ({
    useQuery: jest.fn()
}));

describe('Testing OneEmployee components', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    /*it('renders loading spinner while data is fetching', async () => {
		useQuery.mockReturnValueOnce({ isLoading: true });
		render(<OneEmployee id={41} />);
		const loadingSpinner = await screen.getByTestId('loading-spinner');

		expect(loadingSpinner).toBeInTheDocument();
	});*/

	it('renders error message when there is an error fetching data', () => {
		useQuery.mockReturnValueOnce({ isLoading: false, isError: true });
		render(<OneEmployee />);
		const error = screen.getByText('Error');

		expect(error).toBeInTheDocument();
	});
})