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

    it('renders loading spinner while data is fetching', async () => {
		useQuery.mockReturnValueOnce({ isLoading: true });
		render(<OneEmployee id={100} />);
		const loadingSpinner = await screen.getByTestId('loading-spinner');

		expect(loadingSpinner).toBeInTheDocument;
	});

	it('renders error message when there is an error fetching data', async () => {
		useQuery.mockReturnValueOnce({ isLoading: false, isError: true });
		render(<OneEmployee id={51}/>);
		const error = await screen.getByText('Error');

		expect(error).toBeInTheDocument();
	});
})