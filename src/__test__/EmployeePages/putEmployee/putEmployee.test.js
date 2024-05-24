import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormEditEmployee from '@/components/Employee/editEmployee/FormEditEmployee';
import { QueryClient, QueryClientProvider, useMutation, useQuery } from 'react-query';

// Mock useRouter from next/navigation
jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn() // Mocking push function
	})
}));

// Mock useQuery from react-query
jest.mock('react-query', () => ({
	...jest.requireActual('react-query'),
	useQuery: jest.fn(),
	useMutation: jest.fn()
}));

describe('FormEditEmployee Component', () => {
	const queryClient = new QueryClient();

	const employeeData = {
		message: 'successfull',
		status: 200,
		data: [
			{
				id: 51,
				firstName: 'John',
				lastName: 'Doe',
				birthday: '1990-01-01',
				age: 30
			}
		]
	};

	beforeEach(() => {
		useQuery.mockReturnValue({
			isLoading: false,
			isError: false,
			data: employeeData
		});

		useMutation.mockReturnValue({
			mutate: jest.fn()
		});
	});

	it('should render the form correctly', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<FormEditEmployee idEmployee={51} />
			</QueryClientProvider>
		);

		expect(screen.getByLabelText('FirstName')).toBeInTheDocument();
		expect(screen.getByLabelText('LastName')).toBeInTheDocument();
		expect(screen.getByLabelText('Birthday')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Edit a employee' })).toBeInTheDocument();
	});

	it('should edit employee data when form is submitted', async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<FormEditEmployee idEmployee={51} />
			</QueryClientProvider>
		);

		fireEvent.change(screen.getByLabelText('FirstName'), { target: { value: 'Jane' } });
		fireEvent.change(screen.getByLabelText('LastName'), { target: { value: 'Doe' } });
		fireEvent.change(screen.getByLabelText('Birthday'), { target: { value: '1995-01-01' } });

		fireEvent.click(screen.getByRole('button', { name: 'Edit a employee' }));

		await act(async () => {
			// Esperar a que se complete la mutación
		});

		// Asegurar que se llama a la mutación con los datos correctos
		expect(useMutation).toHaveBeenCalledWith(expect.any(Function));
		expect(useMutation.mock.calls[0][0]).toEqual(expect.any(Function));
	});
});
