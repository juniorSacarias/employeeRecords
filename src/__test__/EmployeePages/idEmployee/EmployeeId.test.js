import { render, screen, fireEvent } from '@testing-library/react';
import { useQuery } from 'react-query';
import IdEmployee from '@/components/Employee/IdEmployee/IdEmployee';

jest.mock('react-query', () => ({
	useQuery: jest.fn()
}));

describe('IdEmployee component', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	test('renders loading spinner if data is loading', async () => {
		useQuery.mockReturnValueOnce({ isLoading: true });

		render(<IdEmployee />);

		const loadingSpinner = await screen.getByTestId('loading-spinner');

		expect(loadingSpinner).toBeInTheDocument();
	});

	/*test('renders error message if there is an error', () => {
    const mockUseQuery = jest.fn();
    mockUseQuery.mockReturnValue({ isError: true });
    jest.mock('react-query', () => ({
      useQuery: mockUseQuery
    }));

    render();
    
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  test('renders employee data when loaded', () => {
    const mockEmployeeData = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        birthday: '01-01-1990',
        age: 30
      }
    ];
    
    const mockUseQuery = jest.fn();
    mockUseQuery.mockReturnValue({ data: { data: mockEmployeeData } });
    jest.mock('react-query', () => ({
      useQuery: mockUseQuery
    }));

    render();
    
    expect(screen.getByTestId('employee-card')).toBeInTheDocument();
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('BirthDay')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  test('calls delete function on button click', async () => {
    const mockUseQueryClient = jest.fn().mockReturnValue({});
    jest.mock('react-query', () => ({
      useQueryClient: mockUseQueryClient
    }));

    const mockPush = jest.fn();
    const mockUseRouter = jest.fn().mockReturnValue({ push: mockPush });
    jest.mock('next/navigation', () => ({
      useRouter: mockUseRouter
    }));

    const mockDeleteEmployeeMutation = {
      mutate: jest.fn()
    };
    jest.mock('react-query', () => ({
      useMutation: jest.fn().mockReturnValue(mockDeleteEmployeeMutation)
    }));

    const mockEmployeeData = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        birthday: '01-01-1990',
        age: 30
      }
    ];
    const mockUseQuery = jest.fn();
    mockUseQuery.mockReturnValue({ data: { data: mockEmployeeData } });
    jest.mock('react-query', () => ({
      useQuery: mockUseQuery
    }));

    render();

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockDeleteEmployeeMutation.mutate).toHaveBeenCalledWith(1);
    expect(mockPush).toHaveBeenCalledWith('/');
  });*/
});
